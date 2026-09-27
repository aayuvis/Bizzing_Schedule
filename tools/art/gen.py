#!/usr/bin/env python3
"""gen.py — paint Bizzing Schedule's pictures with a Gemini image model.

The family doctrine: generative IMAGE models paint places and emblems; everything
structural (the timeline, the board, the honeycomb, every number) is drawn by the
app. So the prompts ask for NO lettering, NO digits and NO people — a model letters
convincingly and counts badly, and a schedule app is made of letters and numbers.

    python3 tools/art/gen.py                      # everything missing
    python3 tools/art/gen.py --only sky-morning,badge-owl
    python3 tools/art/gen.py --force --only sky-night

The key is read from $GKEY_FILE or /root/.gkey (never from the repo, never
printed). Raw PNGs land in tools/art/raw/ (gitignored); process.py sizes them into
app/public/art/.
"""
import base64, json, os, sys, time, urllib.request, concurrent.futures as cf

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, 'raw')
os.makedirs(RAW, exist_ok=True)
KEY = open(os.environ.get('GKEY_FILE', '/root/.gkey')).read().strip()
MODELS = os.environ.get('NB_MODELS', 'gemini-3-pro-image,gemini-3.1-flash-image,gemini-2.5-flash-image').split(',')

STYLE = (
    "Painted illustration for a children's planning app, in a warm, modern storybook style: "
    "soft gouache and watercolour textures, clean readable shapes, gentle light, joyful but calm colour. "
    "ABSOLUTELY NO TEXT: no letters, no words, no numbers, no digits, no clock faces with numerals, no signs "
    "with writing, no labels, no watermark, no signature. No people, no human figures, no faces."
)
SKY = (" A wide panoramic banner landscape: a rolling honey-meadow of wildflowers and clover, a little round "
       "wooden beehive house on a gentle hill at the right, a winding path, distant soft hills. The LEFT HALF is "
       "calmer — mostly open sky and soft meadow with little detail — so white text can sit over it. "
       "No frame, no border, full-bleed.")
JOBS = {
    'sky-morning':   (STYLE + SKY + " Early morning: pale peach and butter-yellow sunrise, dew, long soft shadows, a few bees waking.", '21:9'),
    'sky-day':       (STYLE + SKY + " Bright midday: clear cornflower-blue sky, puffy clouds, vivid greens, busy happy bees.", '21:9'),
    'sky-evening':   (STYLE + SKY + " Golden hour evening: warm amber and rose sky, glowing light through the flowers, lanterns just lit on the hive.", '21:9'),
    'sky-night':     (STYLE + SKY + " Night: deep indigo sky full of stars and a crescent moon, fireflies, the hive windows glowing warm, sleepy and peaceful.", '21:9'),
    'splash':        (STYLE + " A cheerful round beehive cottage with a honey-coloured door and little round windows, in a flower garden, "
                      "a tidy garden path of hexagonal stepping stones leading to it, a few friendly cartoon bees flying. Square composition, centred, full-bleed.", '1:1'),
    'empty-board':   (STYLE + " A tidy little wooden desk seen from the front with three neat empty woven baskets side by side on it, "
                      "a jar of honey, a small potted plant, a pencil cup. Plain soft cream background around it, lots of empty space. Centred spot illustration.", '4:3'),
    'empty-goals':   (STYLE + " A small green mountain with a winding hexagon-stone path climbing to a little flag on the summit (the flag is plain, no symbol), "
                      "flowers along the path, a bee flying up the path. Plain soft cream background around it. Centred spot illustration.", '4:3'),
    'empty-week':    (STYLE + " Seven round stepping stones crossing a gentle stream in a meadow, each stone a different soft colour, a bee hopping across. "
                      "Plain soft cream background around it. Centred spot illustration.", '4:3'),
    'empty-hive':    (STYLE + " A honeycomb of golden hexagon cells, some glowing full of honey and some still empty, on a flowering branch, one bee filling a cell. "
                      "Plain soft cream background around it. Centred spot illustration.", '4:3'),
    'huddle':        (STYLE + " A cosy round woven nest on a branch holding several small eggs of different colours, a warm blanket, soft afternoon light, "
                      "a teapot and cups on a little stump beside it. Plain soft cream background around it. Centred spot illustration.", '4:3'),
}
BADGE = (STYLE + " A single round enamel-pin style MEDALLION badge, centred, filling most of the square, with a bold honey-gold rim and a "
         "rich coloured inner field, on a plain pure white background. Inside the medallion: ")
BADGES = {
    'badge-sunrise':  "a smiling sun rising over a hill with a little bee — for early starts. Sky blue and gold.",
    'badge-balance':  "a balanced see-saw with a book on one end and a football on the other, perfectly level — for a balanced week. Teal and gold.",
    'badge-summit':   "a mountain peak with a plain flag on top — for finishing a goal. Violet and gold.",
    'badge-lantern':  "a glowing paper lantern — for focus. Deep indigo and warm orange.",
    'badge-book':     "an open book with a tiny bee sitting on the pages — for reading. Warm red and cream.",
    'badge-sneaker':  "a running shoe with motion swooshes — for moving your body. Fresh green and white.",
    'badge-palette':  "a painter's palette and brush with a musical note beside it — for creating. Magenta and gold.",
    'badge-comb':     "a honeycomb with every cell full of glowing honey — for a full week. Honey amber.",
    'badge-heart':    "two hands shaping a heart around a small flower (hands only, no people) — for kudos from family. Coral pink.",
    'badge-compass':  "a compass rose with a star at north — for planning your own week. Navy and gold.",
    'badge-owl':      "a friendly owl on a branch under the moon — for a good bedtime. Midnight blue and silver.",
    'badge-rocket':   "a small rocket taking off in a curl of smoke — for a first week. Sky blue and flame orange.",
}
for k, v in BADGES.items(): JOBS[k] = (BADGE + v, '1:1')


def call(model, prompt, ratio):
    body = {"contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": ratio}}}
    req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                                 data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "x-goog-api-key": KEY})
    with urllib.request.urlopen(req, timeout=240) as r:
        d = json.load(r)
    for c in d.get('candidates', []):
        for p in c.get('content', {}).get('parts', []):
            if 'inlineData' in p: return base64.b64decode(p['inlineData']['data'])
    raise RuntimeError('no image in response: ' + json.dumps(d)[:300])


def run(name):
    prompt, ratio = JOBS[name]
    out = os.path.join(RAW, name + '.png')
    msg = ''
    for attempt in range(6):
        model = MODELS[attempt % len(MODELS)]
        try:
            img = call(model, prompt, ratio)
            open(out, 'wb').write(img)
            return f'{name}: ok ({model}, {len(img)//1024} KB)'
        except Exception as e:
            msg = str(e)[:160]
            time.sleep(4 + attempt * 6)
    return f'{name}: FAILED — {msg}'


if __name__ == '__main__':
    only = next((a.split('=', 1)[1] if '=' in a else sys.argv[sys.argv.index(a) + 1] for a in sys.argv if a.startswith('--only')), None)
    names = only.split(',') if only else list(JOBS)
    if not only: print(f'no --only given: generating EVERYTHING missing ({len(names)} jobs)')
    if '--force' not in sys.argv: names = [n for n in names if not os.path.exists(os.path.join(RAW, n + '.png'))]
    with cf.ThreadPoolExecutor(int(os.environ.get('NB_WORKERS', '6'))) as ex:
        for line in ex.map(run, names): print(line, flush=True)
