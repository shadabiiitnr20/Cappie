import { AppComponent, customElement, css, html } from "components/base/app-component.ts";

@customElement("app-index")
export class AppIndex extends AppComponent {
    static styles = css`
        :host {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        :host > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            scale: 1.1;
            filter: blur(25px);
        }

        img + app-group {
            position: absolute;
            max-width: 42rem;
            text-align: center;
        }

        .badge {
            padding: 0.5rem 1rem;
            font-size: var(--text-md);
            font-weight: var(--text-bold);
            color: white;
            border: 1px solid white;
            border-radius: var(--radius-full);
        }

        h1, h2 {
            margin: 0;
            color: white;
            filter: drop-shadow(0 1px 1px rgb(var(--gray-5)));
        }

        h1 {
            font-size: var(--text-4xl);
            font-weight: var(--text-bold);
            line-height: var(--leading-tight);
        }

        h2 {
            font-size: var(--text-xl);
            font-weight: var(--text-normal);
            line-height: var(--leading-normal);
        }

        app-button {
            --surface-1: white;
            --primary: rgb(var(--blue-6));
        }

        app-group:first-child {
            max-width: 40rem;
            text-align: center;
        }

        app-badge {
            box-shadow: var(--shadow-sm) var(--shadow);
        }

        @media (prefers-color-scheme: dark) {
            :host > img {
                filter: blur(25px) brightness(.75);
            }
        }
    `;

    render() {
        return html`
            <img src="/backgrounds/2.jpg">
            <app-group direction="column" gap="huge" centered>
                <app-group class="badge" centered>
                    <img src="/favicon.svg" width="16">
                    Cappie
                </app-group>
                <app-group direction="column">
                    <h1>
                        Vibrant screenshots in seconds
                    </h1>
                    <h2>
                        With Cappie, you can transform your screenshots into vibrant images. Without registration and super fast.
                    </h2>
                </app-group>
                <a href="/home">
                    <app-button type="primary" size="small">
                        Create your image
                    </app-button>
                </a>
            </app-group>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "app-index": AppIndex;
    }
}