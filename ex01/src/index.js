const Keyboard = {
    elements : {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false
    },
    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
       
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
       
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","Backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "Caps Lock",
            "z", "x", "c", "v", "b", "n", "m", "-", "_", "Shift",
            "Space", "Enter"
        ];

        const creatIconHTML = (icon, name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["Backspace", "p", "Caps Lock", "Shift"].indexOf(key) !== -1;
        
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "Backspace":
                    keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.addEventListener("click", () =>{
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
                        this._triggerEvent("oninput");
                    });
                    break;

                    case "Caps Lock":
                        keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--wide2");
                    keyElement.addEventListener("click", () =>{
                        this._toggleCapsLock();
                    });
                    break;

                    case "Shift":
                        keyElement.textContent = key;
                    keyElement.classList.add("keyboard__key--wide2");
                    keyElement.addEventListener("click", () =>{
                        this._triggerEvent("oninput");
                    });
                    break;

                    case "Enter":
                        keyElement.textContent = key;
                        keyElement.classList.add("keyboard__key--wide2");
                        keyElement.addEventListener("click", () =>{
                            this.properties.value += "\n";
                            this._triggerEvent("oninput");
                    });
                    break;

                    case "Space":
                        keyElement.textContent = key;
                        keyElement.classList.add("keyboard__key--extra--wide");
                        keyElement.addEventListener("click", () =>{
                            this.properties.value += " ";
                            this._triggerEvent("oninput");
                    });
                    break;

                    default:
                        keyElement.textContent = key.toLowerCase();
                        keyElement.addEventListener("click", () =>{
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    break;
                    
            }
            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        
        });
        return fragment;
    },
    
    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});