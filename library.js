"use strict";

const topics = require.main.require('./src/topics');
const meta = require.main.require('./src/meta');
const plg = require('./plugin.json');
const { DiceRoll } = require('rpg-dice-roller');
const plugin = module.exports;

plugin.Name = plg.name;
plugin.name = plg.name.toLowerCase();
plugin.settings = {
	botUsername: '',
	botUid: 1
};

plugin.init = async function (data) {
	let settings = await meta.settings.get(plugin.name);
	plugin.settings = {
		botUsername: settings.botUsername || '',
		botUid: settings.botUid || 1
	};
	data.router.get(`/admin/plugins/${plugin.name}`, data.middleware.admin.buildHeader, plugin.renderAdminPage);
	data.router.get(`/api/admin/plugins/${plugin.name}`, plugin.renderAdminPage);
};

plugin.addAdminNavigation = async function (header) {
	header.plugins.push({
		route: `/plugins/${plugin.name}`,
		icon: 'fa-edit',
		name: plugin.Name
	});
	return header;
};

plugin.rollRE = /^\/roll/i;

plugin.replyWithDiceRoll = async function ({ post }) {
	let { tid, content } = post;
	let rolls = (content || '').replace(/(\r\n|\n|\r)/gm, '\n').split('\n')
		.filter(line => {
			return line && plugin.rollRE.test(line.trim())
		})
		.map(line => {
			let input = line.trim().replace(plugin.rollRE, '').trim();
			return (new DiceRoll(input)).toString();
		});
	if (!rolls.length) {
		return;
	}
	await topics.reply({
		tid: tid,
		uid: plugin.settings.botUid,
		content: rolls.join('\n')
	});
};

plugin.renderAdminPage = function (req, res) {
	res.render(`admin/plugins/${plugin.name}`, {});
};

