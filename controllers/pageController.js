exports.getIndex = (req, res) => {
    res.render('index', {
        pageTitle: 'Homepage',
        layout: 'layouts/main-layout'
    });
}