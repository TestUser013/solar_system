export class InfoPanelController {

    private panel: HTMLElement;

    private controls: HTMLElement[];

    constructor(selector: string) {
        this.panel = document.querySelector(selector);
        this.controls = [...this.panel.querySelectorAll('.control')] as HTMLElement[];
    }

    public show(): void {
        this.panel.style.display = '';
    }

    public hide(): void {
        this.panel.style.display = 'none';
    }

    public highlight(key: string): void {
        this.getControl(key)?.classList.add("highlight");
    }

    public trivialize(key: string): void {
        this.getControl(key)?.classList.remove("highlight");
    }

    private getControl(key: string): HTMLElement {
        return this.controls.find((element: HTMLElement) => element.style.gridColumnStart === key);
    }

}
