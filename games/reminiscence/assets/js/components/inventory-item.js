import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { itemProperties } from '../items.js';
import '/web-components/aqv2/components/tooltip.js'
import '/web-components/aqv2/components/translate.js'

export let inventoryItemStyle = css`
:host {
    min-width: 8em;
    background-color: var(--background-color-dk);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.2em;
}

aq-tooltip {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.item-name {
    min-width: 7.6em;
    display: flex;
    align-items: center;
    justify-content: center
}
`

export class InventoryItem extends LitElement {
    static properties = {
        item: {},
        count: {type: Number},
        price: {type: Number},
    }

    render() {
        return html`
        <aq-tooltip>
            <div class='item-name'>
                <div class='icon'></div>
                <div><aq-ts key='item.${this.item}'></aq-ts> × ${this.count}</div>
            </div>
            <div slot='tooltip'>
                <div><aq-ts key='item.${this.item}.desc'></aq-ts></div>
                ${itemProperties[this.item].tag.includes('product') ? html`<div><aq-ts key='ui.price'></aq-ts>: ${itemProperties[this.item].price}</div>` : ''}
            </div>
        </aq-tooltip>
        `
    }

    static styles = inventoryItemStyle
}

customElements.define('inventory-item', InventoryItem);