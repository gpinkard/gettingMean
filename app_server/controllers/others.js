/* GET home page */

module.exports.about = function (req, res) {
	res.render('generic-text', {
		title: 'About Loc8r',
		content: 'Loc8r was created to help peple find places to sit down and get a bit of work done\n\nNulla eleifend, augue vitae tempus ullamcorper, augue dui gravida urna, pulvinar gravida lectus nulla non arcu. Nulla laoreet lacus purus.'
	});
};

module.exports.angularApp = function(req, res) {
  res.render('layout', { title: 'Loc8r' });
};
