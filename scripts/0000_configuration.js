var configuration = {
    tabSet: {
        nodeList: ['.c-tabset', '.c-tab-content'],
        activeClass: 'active',
        tabListItemTag: 'a',
        tabListItemTargetAttr: 'href'
    },
    routerLink: {
        nav: '.js-navigation-selector',
        itemList: 'li > a',
        targetAttr: 'href'
    },
    navigation: {
        elem: '.js-nav',
        menu: '.js-nav ~ aside'
    },
    installApp: {
        buttonId: '#installBtn',
        bannerId: '#installBanner'
    },
    animation: {
        elem: "[data-animation]",
        activeClass: 'active'
    }
};
