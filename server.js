var Botkit =requir('botkit)

var accessToken = process.enc.FACEBOOK_PAGE_ACCESS_TOKEN
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN
var port = process.env.PORT

if(!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing')
if(!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing')
if(!port) new Error('PORT is required but missing')

var controller = Botkit.facebookbot({
	access_token: accessToken,
	verify_token: verifyToken
})

var bot =controller.spawn()
controller.setupWebserver(port, function(err, webserver)){
	if (err) return console.log(err)
	controller.createWebhookEndpoints(webserver, bot, function(){
		console.log('Read Player 1')
	})
})

controller.hears(['hello','hi'],'message_received', function (bot, message){
	bot.reply(message, 'Hello! This is Zeckon Aditya personal bot... wassup!')
	bot.reply(message, 'Okay ask me Whats the weather')
	bot.reply(message, {
		attachment : {
			type: 'template',
			payload: {
				template_type: 'button',
				text:  'You want weather or leave a message and say goodbye',
				title: 'Your call',
				buttons:[
					{
						type: 'postback',
						title: 'Whats the Weather'
						payload: 'weather'
					},
					{
						type: 'postback',
						title: 'I will leave a message',
						payload: 'message'
					}
				]
						
			}
			
		}
	}
})

controller.on('facebook_postback',function(bot,message){
	switch(message.payload){
		case 'weather':
			bot.reply(message, {
				attachment: {
					type: 'location',
					payload:{
						location: ''
					}
				}
			})
		break
		case 'message':
			bot.reply(message, {
				attachment: {
					type: 'message',
					payload:{
						message: 'Okay then!leave a message'
					}
				}
			})
			break
		}
	})