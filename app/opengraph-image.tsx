import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-monday application page, matching the
// page's look — monday.com's real brand, read live off monday.com: white
// surface, giant light near-black Poppins-style type with a pink→orange
// gradient keyword phrase, an indigo (#6161FF) CTA pill, and the three-capsule
// mark nod (red/yellow/green). Rendered at build time by next/og (Satori), so
// it uses a flexbox-only subset of CSS and plain hex colours (Latin text only).

export const alt =
  'Bar Moshe for monday.com — AI Software Engineer, RevAI. MCP servers on npm, durable agent pipelines on Temporal, LLM apps with retries and evals.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 48px',
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(720px 420px at 50% -10%, rgba(97,97,255,0.10), transparent 65%), radial-gradient(520px 340px at 92% 100%, rgba(254,129,228,0.12), transparent 60%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row: capsule mark + wordmark + application pill */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div
              style={{
                display: 'flex',
                width: 14,
                height: 34,
                borderRadius: 8,
                backgroundColor: '#f62b54',
                transform: 'rotate(35deg)',
              }}
            />
            <div
              style={{
                display: 'flex',
                width: 14,
                height: 34,
                borderRadius: 8,
                backgroundColor: '#ffcc00',
                transform: 'rotate(35deg)',
                marginLeft: 6,
              }}
            />
            <div
              style={{
                display: 'flex',
                width: 14,
                height: 14,
                borderRadius: 14,
                backgroundColor: '#00ca72',
                marginLeft: 6,
                marginBottom: 2,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 16,
              fontSize: 40,
              fontWeight: 700,
              color: '#333333',
              letterSpacing: '-0.02em',
            }}
          >
            bar moshe
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 20,
              padding: '8px 18px',
              borderRadius: 999,
              backgroundColor: 'rgba(97,97,255,0.10)',
              fontSize: 22,
              fontWeight: 500,
              color: '#6161ff',
            }}
          >
            for monday.com · Application
          </div>
        </div>

        {/* Headline: their giant light type with the pink→orange gradient phrase */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 68,
              fontWeight: 400,
              color: '#333333',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              maxWidth: '1020px',
            }}
          >
            <div style={{ display: 'flex' }}>Bar Moshe</div>
            <div
              style={{
                display: 'flex',
                backgroundImage: 'linear-gradient(90deg, #FE81E4 20%, #FDA900 90%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI builder &amp; full-stack engineer
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#676879',
              marginTop: '24px',
              maxWidth: '940px',
              lineHeight: 1.4,
            }}
          >
            MCP servers on npm, durable agent pipelines on Temporal, LLM apps with
            retries and evals, and the DevOps around them.
          </div>
        </div>

        {/* Foot meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 25,
            color: '#9aa0b4',
          }}
        >
          <div style={{ display: 'flex' }}>github.com/barmoshe</div>
          <div
            style={{
              display: 'flex',
              padding: '14px 30px',
              borderRadius: 160,
              backgroundColor: '#6161ff',
              fontWeight: 500,
              fontSize: 22,
              color: '#ffffff',
            }}
          >
            AI Software Engineer, RevAI · Tel Aviv →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
