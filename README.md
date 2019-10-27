# nodebb-plugin-dice

A dice roller plugin based on https://github.com/GreenImp/rpg-dice-roller

# Usage

```
npm install nodebb-plugin-dice
```
* Or install via ACP > Extend > Plugins
* then login to your NodeBB ACP > Extend > Plugins to activate
* Then restart your instance
* Then visit `/admin/plugins/dice` or Plugins > Dice, delegate a user to be the `bot` that replies to the users.
* Then when creating a topic or a post type a `/roll` command
```
/roll 2d6!>4

```

![Screen Shot 2019-10-27 at 6 11 33 PM](https://user-images.githubusercontent.com/1398375/67637848-2e558080-f8e7-11e9-8fe8-d22a2e0c8f23.png)


![Screen Shot 2019-10-27 at 6 16 10 PM](https://user-images.githubusercontent.com/1398375/67637849-2e558080-f8e7-11e9-852c-40e0ddc3351e.png)

Keep in the mind the following points:

* if you see an error `[[error:no-privileges]]` in the logs, that means that the delegated bot does not have write access to that specific category/topic, you need to make sure the bot can reply everywhere.
* if you see `[[error:too-many-posts-newbie...]]` in the logs, that means that the bot is newly created.

