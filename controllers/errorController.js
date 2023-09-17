exports.get404 = (req, res) => {
    res.render('error404', {
        pageTitle: 'Page Not Found',
        layout: 'layouts/plain-layout'
    });
}