var ElementSetModule = (function(doc) {
    var config = {};

    var init = function(conf) {
        this.config = Object.assign({}, conf);
        // methods
        _addEventListeners(this.config);
        _setAria();
    }

    var _addEventListeners = function(config) {
        // can be multiple tabsets in the document
        var containerList = doc.querySelectorAll(config.nodeList[0]);
        // map over it
        Array.from(containerList).map(function(container) {
            // get children
            // first: list items
            var tabListItemList = container && container.querySelectorAll(config.tabListItemTag);
            // then: content items
            var tabContentList = container && container.querySelectorAll(config.nodeList[1]);
            if (tabListItemList) {
                for (var i = 0; i <  tabListItemList.length; i++) {
                    tabListItemList[i].addEventListener('click', function(e) {
                        e.preventDefault();
                        var targetId = e.target.getAttribute(config.tabListItemTargetAttr).substring(1);
                        Array.from(tabListItemList).map(function(item) {
                            if (item.getAttribute(config.tabListItemTargetAttr) !== e.target.getAttribute(config.tabListItemTargetAttr)) {
                                item.classList.remove(config.activeClass);
                            }});
                        Array.from(tabContentList).map(function(item) {
                            item.classList.remove(config.activeClass);
                            if (targetId === item.id) {
                                item.classList.add(config.activeClass);
                            }
                        });
                        e.target.classList.add(config.activeClass);
                    }, false);
                }
            }
        });
    }

    var _setAria = function() {
        //
    }

    return {
        init: init
    }


})(window.document);

var RouterLinkModule = (function(doc) {
    function init(conf) {
        // methods
        _addEventListeners(conf);
        _getQueryParams(location, conf);
    }

    var _addEventListeners = function(config) {
        var selector = doc.querySelector(config.nodeList.selector);
        var itemList = doc.querySelectorAll(config.nodeList.itemList);
        var targetLink = doc.querySelector("[" + config.targetAttr + "]");
        var nav = doc.querySelector(config.nodeList.nav);
        var initialHref = targetLink && targetLink.href.slice();
        if (targetLink && selector && itemList) {
            // initial values
            targetLink.href = initialHref + '?expertise=' + itemList[0].value;
            targetLink.setAttribute('aria-label', itemList[0].value);

            // on input radio change
            for (var i = 0; i <  itemList.length; i++) {
                itemList[i].addEventListener('change', function(e) {
                    e.preventDefault();
                    if ('' !== e.target.value) {
                        targetLink.href = initialHref + config.form.id + '?expertise=' + e.target.value;
                        targetLink.setAttribute('aria-label', e.target.value);
                        selector.removeAttribute('open');
                        targetLink.focus();
                    }

                }, false);
            }
        }
        if (nav) {
            Array.from(nav.querySelectorAll('li > a')).map(function(anchor) {
                anchor.classList.remove('active');
                if ('' !== anchor.getAttribute('href') && anchor.href.indexOf(location.pathname) > -1 && '/' !== location.pathname) {
                    anchor.classList.add('active');
                }
            });
        }
    }

    var _getQueryParams = function(location, config) {
        var form = doc.querySelector(config.form.id);
        if (form && location.search) {
            form.scrollIntoView({
                behavior: 'smooth',
                block: "end",
            });
            Array.from(form.elements).map(function(element) {
                if (element.type === 'hidden') {
                    element.value = location.search.split('=')[1];
                }
            });
        }
    }

    return {
        init: init
    }
})(window.document);

// Main module
var MainModule = (function(ElementSetModule, RouterLinkModule) {
    return {
        init: function(configuration) {
            ElementSetModule.init(configuration.tabSet);
            RouterLinkModule.init(configuration.routerLink);
        }
    }
})(ElementSetModule, RouterLinkModule);
