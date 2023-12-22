import ArcTag from "./arc-tag.js"

const style = await fetch('/writings/abs-str/ast-2/ast-2-assets/components/styles/arc-header.css').then(res => res.text())
const styleSheet = new CSSStyleSheet()
styleSheet.replaceSync(style)

const template = `
<div class='base'>
    <div class='header'>
        <h1></h1>
        <span></span>
    </div>
    <div class='separator'></div>
    <div class='main'>
        <slot></slot>
    </div>
</div>
`

export class ArcHeader extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'})
        this.shadowRoot.adoptedStyleSheets.push(styleSheet)
        this.shadowRoot.innerHTML = template

        this.shadowRoot.querySelector('.header h1').innerHTML = this.getAttribute('item-index')
        this.shadowRoot.querySelector('.header span').innerHTML = this.getAttribute('item-alias')
    }
}

customElements.define('arc-header', ArcHeader)
if(customElements.get('arc-tag') == undefined) {
    customElements.define('arc-tag', ArcTag)
}