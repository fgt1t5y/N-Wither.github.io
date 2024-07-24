import { StringUtils } from './string.js'

/**
 * @param {string} tagName
 * @param {any} content
 */
function createElement(tagName, content) {
    return new DOMUtils._BetterElementWrapper(tagName, content);
}

/**
 *
 * @param {string} selector
 * @param {boolean} [unwrap = false]
 * @returns
 */
function select(selector, unwrap = false) {
    if(typeof selector === 'string') {
        let el = document.querySelector(selector);
        if (el == null) {
            return null;
        } else {
            return unwrap == true ? el : new DOMUtils._BetterElementWrapper(el);
        }
    }
    else if (typeof selector === 'object') {
        if(selector instanceof Document) {
            return document;
        }
        else if (selector instanceof HTMLElement) {
            return unwrap == true ? selector : new DOMUtils._BetterElementWrapper(selector);
        }
    }
    else throw new TypeError('Invalid selector.');
}

/**
 *
 * @param {string} selector
 * @param {boolean} [unwrap = false]
 * @returns
 */
function selectAll(selector, unwrap = false) {
    let list = document.querySelectorAll(selector);
    if (list.length == 0) {
        return null;
    } else {
        if (unwrap == true) {
            return list;
        } else {
            return Array.from(list).map(el => new DOMUtils._BetterElementWrapper(el));
        }
    }
}

export class DOMUtils {
    static _BetterElementWrapper = class BetterElementWrapper {
        /**
         * @overload
         * @param {string} tagName
         * @param {any} content
         */
        /**
         * @overload
         * @param {Element} element
         */
        constructor(tagName, content = undefined) {
            if (typeof tagName === 'string') {
                this.element = document.createElement(tagName);
            } else if (tagName instanceof HTMLElement) {
                this.element = tagName;
            }

            if (content != undefined) {
                if (Array.isArray(content)) {
                    content.forEach(item => BetterElementWrapper.#append(this.element, item));
                } else {
                    BetterElementWrapper.#append(this.element, content);
                }
            }
        }

        /**
         *
         * @param {Node} target
         * @param {any} item
         */
        static #append(target, item) {
            if (typeof item === 'string') {
                let textNode = new Text(item);
                target.appendChild(textNode);
            } else if (item instanceof Node) {
                target.appendChild(item);
            } else if (item instanceof BetterElementWrapper) {
                target.appendChild(item.element);
            } else {
                try {
                    let textNode = new Text(String(item));
                    target.appendChild(textNode);
                } catch {
                    throw new TypeError('Invalid content.');
                }
            }
        }

        /**
         * 
         * @param {BetterElementWrapper | string | Node} element 
         */
        static #parseElement(element) {
            if (element instanceof BetterElementWrapper) {
                return element.element;
            } else if (typeof element === 'string') {
                return document.querySelector(element);
            }
            else if (element instanceof Node) {
                return element;
            } else {
                return null;
            }
        }

        element;

        get() {
            return this.element;
        }

        /**
         *
         * @param {string} name
         * @param {string} value
         * @returns 
         */
        attr(name, value) {
            if (value === null) {
                this.element.removeAttribute(name);
            } else {
                this.element.setAttribute(name, value);
            }
            return this;
        }

        /**
         *
         * @param {string} name
         * @param {any} value
         */
        prop(name, value) {
            this.element[name] = value;
            return this;
        }

        /**
         * @overload
         * @param {object} map
         * @returns {BetterElementWrapper}
         */
        /**
         * @overload
         * @param {string} name
         * @param {string} value
         * @returns {BetterElementWrapper}
         */
        css(nameOrMap, value) {
            if (typeof nameOrMap === 'string') {
                this.element.style.setProperty(nameOrMap, value);
            } else if (typeof nameOrMap === 'object') {
                Object.keys(nameOrMap).forEach(key => {
                    if (typeof key === 'string') {
                        this.element.style.setProperty(StringUtils.camelToKebab(key), nameOrMap[key]);
                    } else {
                        try {
                            let keyStr = String(key);
                            this.element.style.setProperty(StringUtils.camelToKebab(keyStr), nameOrMap[key]);
                        } catch {
                            console.warn('The key of the CSS map is invalid, skipped.');
                        }
                    }
                });
            } else {
                throw new TypeError('Invalid argument type');
            }

            return this;
        }

        /**
         *
         * @param  {...string} className
         * @returns
         */
        class(...className) {
            this.element.classList.add(...className);
            return this;
        }

        /**
         *
         * @param {string | Node} parent
         */
        appendTo(parent) {
            if (typeof parent === 'string') {
                let target = document.querySelector(parent);
                if (target == null) {
                    throw new Error('Parent not found.');
                } else {
                    target.appendChild(this.element);
                }
            } else if (parent instanceof Node) {
                parent.appendChild(this.element);
            } else {
                throw new TypeError('Invalid parent.');
            }

            return this;
        }

        /**
         *
         * @param {string | Node} child
         */
        append(child) {
            BetterElementWrapper.#append(this.element, child);
            return this;
        }

        /**
         * 
         * @param {BetterElementWrapper | string | Node} sibling 
         * @returns 
         */
        insertBefore(sibling) {
            sibling = BetterElementWrapper.#parseElement(sibling)
            if(sibling == null) {
                throw new TypeError('Invalid sibling.');
            }

            this.element.parentNode.insertBefore(this.element, sibling);
            return this;
        }

        /**
         * @param {string} html 
         * @returns 
         */
        html(html) {
            this.element.innerHTML = html;
            return this;
        }

        /**
         * @param {string} event
         * @param {EventListenerOrEventListenerObject | null} callback
         * @param {boolean | AddEventListenerOptions | undefined} options
         * @returns
         */
        on(event, callback, options) {
            this.element.addEventListener(event, callback, options);
            return this;
        }

        remove() {
            this.element.remove();
        }

        /**
         * 
         * @param {BetterElementWrapper | string | Node} parent 
         * @returns 
         */
        isChildOf(parent) {
            parent = BetterElementWrapper.#parseElement(parent)
            if(parent == null) {
                throw new TypeError('Invalid parent.');
            }

            return parent.contains(this.element);
        }

        /**
         * 
         * @param {BetterElementWrapper | string | Node} sibling 
         * @returns 
         */
        isFollowedBy(sibling) {
            sibling = BetterElementWrapper.#parseElement(sibling)
            if(sibling == null) {
                throw new TypeError('Invalid sibling.');
            }

            return this.element.nextElementSibling === sibling;
        }

        get previous() {
            return new BetterElementWrapper(this.element.previousElementSibling);
        }

        get next() {
            return new BetterElementWrapper(this.element.nextElementSibling);
        }

        get parent() {
            return new BetterElementWrapper(this.element.parentNode);
        }
    };

    static createElement = createElement;
    static select = select;
    static selectAll = selectAll;
}

export { createElement, select, selectAll };