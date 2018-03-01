const docNav = $('#doc-nav');
const docContent = $('#doc-content');
const rootPath = getRootPath();
const basePath = '/doc/part/';
var currentTarget = window.location.hash;
var activeNav;
//获取项目根目录
function getRootPath() {
    let pathName = window.location.pathname.substring(1);
    let webName = pathName === '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    if (webName === "") {
        return window.location.protocol + '//' + window.location.host;
    }
    else {
        return window.location.protocol + '//' + window.location.host + '/' + webName;
    }
}
function htmlEscape(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

//获取内容
function loadContent(href, title, hType) {

    let history = hType || false;
    if (history) {
        window.history.replaceState(null, '', href);
    } else {
        window.history.pushState({},'',href);
    }
    href = href.slice(1);
    $(this).ajaxUrl({
        type: 'GET',
        url: rootPath + '/' + basePath + href + '.html',
        // cache: false,
        dataType: 'html',
        success: function (res) {
            res = '<h2>' + title + '</h2>' + res;
            docContent.html(res);
            $('.prettyprint').each(function () {
                let html = $(this).html();

                $(this).html(htmlEscape(html))
            });
            window.prettyPrint();
            new Clipboard('[data-toggle=copy]');
        },
        beforeSend: function () {
            NProgress.start();
        },
        complete: function () {
            NProgress.done();
            // NProgress.remove();
        }
    });
}

window.onpopstate = function(event) {
    activeNav.removeClass('active');
    activeNav = docNav.find('a[href='+ window.location.hash +']').first().addClass('active');
    loadContent(window.location.hash, activeNav.text(), true)
};

function goto(target, title) {
    activeNav.removeClass('active');
    activeNav = docNav.find('a[href='+ target +']').first().addClass('active');
    title = title || activeNav.text()
    loadContent(target, title)
}

$(function () {
    if (currentTarget !== '') {
        activeNav = docNav.find('a[href='+ currentTarget +']').first();
    } else {
        activeNav = docNav.find('.doc-nav-subitem a').first();
    }
    activeNav.addClass('active');
    if (activeNav.length > 0) {
        loadContent(activeNav.attr('href'), activeNav.text())
    }
    docNav.on('click', '.doc-nav-subitem a', function (e) {
        e.preventDefault();
        let el = $(this),
            href = el.attr('href'),
            title = el.text();
        activeNav.removeClass('active');
        activeNav = el.addClass('active');
        loadContent(href, title);
    })
})