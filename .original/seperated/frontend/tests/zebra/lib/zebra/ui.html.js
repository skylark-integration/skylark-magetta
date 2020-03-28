(function(pkg, Class) {

pkg.HtmlElement = Class(pkg.Panel, pkg.FocusListener, [
    function $prototype() {
        this.isLocAdjusted = false;
        this.canvas = null;
        this.ePsW = this.ePsH = 0;

        this.setFont = function(f) {
            this.element.style.font = f.toString();
            this.vrp();
        };

        this.setColor = function(c) {
            this.element.style.color = c.toString();
        };

        this.adjustLocation = function() {
            if (this.isLocAdjusted === false && this.canvas != null) {
                var a = zebra.layout.getAbsLocation(0,0,this);
                this.element.style.top  = "" + (this.canvas.offy + a[1]) + "px";
                this.element.style.left = "" + (this.canvas.offx + a[0]) + "px";
                this.isLocAdjusted = true;
            }
        };

        this.calcPreferredSize = function() {
            return { width: this.ePsW, height: this.ePsH };
        };

        this.recalc = function() {
            // save elements metrics
            var e = this.element,
                t = e.style.paddingTop,
                l = e.style.paddingLeft,
                b = e.style.paddingBottom,
                r = e.style.paddingRight,
                w = e.style.width,
                h = e.style.height;

            // force metrics to be calculated automatically 
            e.style.padding = "0px";
            e.style.width   = "auto";
            e.style.height  = "auto";

            // fetch preferred size
            this.ePsW = e.offsetWidth;
            this.ePsH = e.offsetHeight;

            // restore metrics
            e.style.width         = w;
            e.style.height        = h;
            e.style.paddingTop    = t;
            e.style.paddingLeft   = l;
            e.style.paddingBottom = b;
            e.style.paddingRight  = r;
        };

        this.updateSize = function() {
            var e = this.element;
            e.style.paddingTop    = '' + this.getTop()    + "px";
            e.style.paddingLeft   = '' + this.getLeft()   + "px";
            e.style.paddingRight  = '' + this.getRight()  + "px";
            e.style.paddingBottom = '' + this.getBottom() + "px";
            this.setSize(this.width, this.height);
        };

        this.setContent = function(content) {
            this.element.innerHTML = content;
            this.vrp();
        };

        this.setStyles = function(styles) {
            for(var k in styles) {
                this.setStyle(k, styles[k]);
            }
        };

        this.setStyle = function(name, value) {
            var i = name.indexOf(':');
            if (i > 0) {
                if (zebra[name.substring(0, i)]) {
                    this.element.style[name.substring(i + 1)] = value;
                }
            }
            else {
                this.element.style[name] = value;
            }
        };

        this.setAttribute = function(name, value) {
            this.element.setAttribute(name, value);
        };
    },

    function(e) {
        e = this.element = zebra.isString(e) ? document.createElement(e) : e;
        e.setAttribute("id", this.toString());
        this.$super();
        document.body.appendChild(e);

        var $this = this;

        // it is important to avoid mouse event since for some html element 
        // it can cause unexpected event generation. for instance text input 
        // element can generate mouse moved on mobile devices whenever it gets 
        // focus
        if (zebra.isTouchable === false) {
            e.onmousemove = function(ee) {
                if ($this.canvas != null) {
                    $this.canvas.mouseMoved(1, {
                        target: $this.canvas.canvas,
                        pageX : ee.pageX,
                        pageY : ee.pageY
                    });
                }
            };

            e.onmousedown = function(ee) {
                if ($this.canvas != null) {
                    $this.canvas.mousePressed(1, {
                        target: $this.canvas.canvas,
                        pageX : ee.pageX,
                        pageY : ee.pageY
                    });
                }
            };

            e.onmouseup = function(ee) {
                if ($this.canvas != null) {
                    $this.canvas.mouseReleased(1, {
                        target: $this.canvas.canvas,
                        pageX : ee.pageX,
                        pageY : ee.pageY
                    },
                    ee.button === 0 ? pkg.MouseEvent.LEFT_BUTTON: (ee.button == 2 ? pkg.MouseEvent.RIGHT_BUTTON : 0));
                }
            };
        }

        e.addEventListener("focus", function(ee) {

            // mark the element  has focus on the given canvas
            $this.element.canvas = $this.canvas;

            // notify focus manager the given component has got focus
            zebra.ui.focusManager.requestFocus($this);
        }, false);

        e.addEventListener("blur", function(ee) {
            // flush the native element canvas filed to say the component doesn't have focus anymore
            $this.element.canvas = null;

            if ($this.canvas != null) {
                // run timer that checks if the native web component has lost focus because of
                // leaving the canvas where it hosts:
                //  -- the focus doesn't belong to the canvas where the native component sits 
                //    AND 
                //  -- the focus doesn't belong to another native component that sits on the 
                //     canvas  
                setTimeout(function() {
                    var fo = zebra.ui.focusManager.focusOwner;
                    if ((document.activeElement != $this.canvas.canvas) &&                    
                        (document.activeElement != null && $this.canvas != document.activeElement.canvas))
                    {
                       zebra.ui.focusManager.requestFocus(null);
                    }
                }, 100);
            }
        }, false);

        e.onkeydown = function(ee) {
            if ($this.canvas != null) {
                // store current focus owner to analize if the event triggered focus owner changing 
                var pfo = zebra.ui.focusManager.focusOwner;

                // re-define key event since preventDefault has to be disabled, 
                // otherwise navigation key will noty work 
                $this.canvas.keyPressed({
                    keyCode       : ee.keyCode,
                    target        : ee.target,
                    altKey        : ee.altKey,
                    shiftKey      : ee.shiftKey,
                    ctrlKey       : ee.ctrlKey,
                    metaKey       : ee.metaKey,
                    preventDefault: function() {}
                });

                var nfo = zebra.ui.focusManager.focusOwner;
                // if focus owner has been updated
                if (nfo != pfo) {
                    ee.preventDefault();
                    // if focus owner has been moved to another HTML component we have to pass focus to it
                    if (nfo != null && zebra.instanceOf(nfo, pkg.HtmlElement) && document.activeElement != nfo.element) {
                        nfo.element.focus();
                    }
                    else {
                        // otherwise return focus back to canvas
                        $this.canvas.canvas.focus();
                    }
                }
            }
        };

        e.onkeyup  = function(ee) {
            if ($this.canvas != null) {
                $this.canvas.keyReleased(ee);
            }
        };

        e.onkeypress = function(ee) {
            if ($this.canvas != null) {
                $this.canvas.keyTyped({
                    keyCode       : ee.keyCode,
                    target        : ee.target,
                    altKey        : ee.altKey,
                    shiftKey      : ee.shiftKey,
                    ctrlKey       : ee.ctrlKey,
                    metaKey       : ee.metaKey,
                    preventDefault: function() {}
                });
            }
        };
    },

    function focused() {
        if (this.hasFocus()) {
            // if the component has focus that has came from Zebra component we should 
            // set focus to native component that hosted by Zebra component
            var pfo = zebra.ui.focusManager.prevFocusOwner;
            if (pfo == null || zebra.instanceOf(pfo, pkg.HtmlElement) === false) {
                this.element.focus();
            }
        }

        this.$super();
    },

    function setPaddings(t,l,b,r) {
        this.$super(t,l,b,r);
        this.updateSize();
    },

    function setVisible(b) {
        if (this.isVisible != b) {
            this.element.style.visibility = b ? "visible" : "hidden";
            this.$super(b);
        }
    },

    function setEnabled(b) {
        this.$super(b);
        this.element.disabled = !b;
    },

    function setSize(w, h) {
        this.$super(w, h);
        // HTML element size is calculated as sum of "width"/"height", paddings, border
        // So the passed width and height has to be corrected by reduction of extra HTML 
        // gaps. For this we firtsly set the width and size
        this.element.style.width  = "" + w + "px";
        this.element.style.height = "" + h + "px";

        // than we know the component metrics and can compute necessary reductions
        var dx = this.element.offsetWidth  - w,
            dy = this.element.offsetHeight - h;
        this.element.style.width   = "" + (w - dx) + "px";
        this.element.style.height  = "" + (h - dy) + "px";
    },

    function setLocation(x, y) {
        this.$super(x, y);
        this.isLocAdjusted = false;
    },

    function validate() {
        if (this.canvas == null && this.parent != null) {
            this.canvas = pkg.findCanvas(this);
        }

        if (this.canvas != null && this.isLocAdjusted === false) {
            this.adjustLocation();
        }

        this.$super();
    },

    function setParent(p) {
        this.$super(p);
        this.element.style.visibility = p == null || this.isVisible === false ? "hidden" 
                                                                              : "visible";
        this.isLocAdjusted = false;
        this.canvas = p != null ? pkg.findCanvas(this) : null;
    }
]);

pkg.HtmlTextInput = Class(pkg.HtmlElement, [
    function $prototype() {
        this.canHaveFocus = function() {
            return true;
        };

        this.getText = function(t) {
            return this.element.value.toString();
        };

        this.setText = function(t) {
            if (this.element.value != t) {
                this.element.value = t;
                this.vrp();
            }
        };
    },

    function(text, elementName) {
        this.$super(elementName);
        this.element.setAttribute("tabindex", 0);
        this.setText(text);
    }
]);

pkg.HtmlTextField = Class(pkg.HtmlTextInput, [
    function() {
        this.$this("");
    },

    function(text) {
        this.$super(text, "input");
        this.element.setAttribute("type",  "text");
    }
]);

pkg.HtmlTextArea = Class(pkg.HtmlTextInput, [
    function() {
        this.$this("");
    },

    function(text) {
        this.$super(text, "textarea");
        this.element.setAttribute("rows", 10);
    }
]);


})(zebra("ui"), zebra.Class);