import { AppComponent, customElement, css, html } from "components/base/app-component.ts";
import { all } from "persistence/controller/lit-controller.ts";
import { ComposedImage } from "../../models/composed-image.ts";

@customElement("app-history")
export class AppHistory extends AppComponent {
    @all(ComposedImage.where().sort("createdDate").asc())
    compositions: ComposedImage[] = [];

    static styles = css`
        :host {
            display: flex;
            flex: 1;
            padding: var(--size-8);
            overflow: auto;
        }

        :host > app-group {
            flex: 1;
        }

        [direction=grid] {
            --min-width: 25rem;
        }
    `;

    render() {
        return html`
            <app-group direction="column" gap="large">
                <app-group justify="space-between" centered>
                    <app-title>
                        History
                    </app-title>
                    <app-button
                        size="tiny"
                        ?disabled=${!this.compositions.length}
                        @click=${this.handleDeleteAll}
                    >
                        <app-icon name="trash-regular"></app-icon>
                        <app-text>Delete all</app-text>
                    </app-button>
                </app-group>
                ${this.compositions.length
                    ? html`
                        <app-group direction="grid" gap="large">
                            ${this.compositions.map(composition => html`
                                <a href="/home/${composition.uuid}">
                                    <image-button
                                        id=${composition.uuid}
                                        deletable
                                        @delete-image=${this.handleDeleteImage}
                                    >
                                        <img src=${composition.preview ?? String()}>
                                    </image-button>
                                </a>
                            `)}
                            <div></div>
                            <div></div>
                            <div></div>
                        </app-group>
                    `
                    : html`
                        <app-paragraph>No images added yet.</app-paragraph>
                    `
                }
            </app-group>
        `;
    }

    private handleDeleteAll() {
        document.createElement("app-dialog").show({
            title: "Please confirm",
            text: "Do you really want to delete all images?",
            actions: {
                Delete: () => {
                    this.compositions.map(composition => composition.delete());
                }
            }
        });
    }

    private handleDeleteImage({ detail }: CustomEvent<string>) {
        document.createElement("app-dialog").show({
            title: "Please confirm",
            text: "Do you really want to delete the image?",
            actions: {
                Delete: () => {
                    this.compositions.find(composition => composition.uuid === detail)?.delete();
                }
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "app-history": AppHistory;
    }
}
