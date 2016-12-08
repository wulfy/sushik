//casperjs test m6mobile.js <--url=xxxxx>


var url1 = 'http://www.m6mobile.fr';

if(casper.cli.has("url"))
	url1 = casper.cli.get("url");

casper.test.begin('Testing '+url1, 5, function suite(test) {

var login = "0675360582";
var loginHeader = "0675360582";
var fakelogin = "0637987293";
var pwd = "m6mobile";
//var mouse = require("mouse").create(casper);
var waitTimeout = 10000;


	casper.start(function() {
		this.echo("Testing "+url1 + " Debug:"+debug);
	});
	casper.viewport(1024, 768);
	casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36');
	//casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
	casper.loadImages = true;
	casper.loadPlugins = true;


	/*casper.thenOpen('http://msga.m6web.fr:1121/?NumTel=0619813189', {
	    method: 'GET',
	    headers: {
            'Content-Type':'text/plain',
        }
	} , function (response){
		this.echo("réponse");
		require('utils').dump(response);
	} );*/

	//TEST affichage formulaire 
	casper.thenOpen(url1+'/inscription-m6mobile/').waitForSelector('#MOT_DE_PASSE', 

		function then() {
				this.test.assert(true, 'Formulaire accessible');

		},
			function timeout(){
				this.capture('Formulaire.png');
				this.test.assert(false, 'Formulaire innaccessible');
				
	},waitTimeout);

	//test confirmation mot de passe
	casper.then(function (){

				var pass = "testtttt";
				var numtel = fakelogin;
	
				this.sendKeys('#MOT_DE_PASSE', pass);
				this.sendKeys('#confpassw', pass);
				this.test.assertDoesntExist('.error','Pas d erreur confirmation password ');

	});

	//service de controle des numéros
	casper.then(function (){
		var pass = "testtttt";
		var numtel = fakelogin;
		
		this.sendKeys('#NUM_TELEPHONE', numtel);
		this.click('#envoyer');

		if (this.exists('.error')) {
			var error_text = this.getElementInfo(".error");
			
			if ((error_text.text).indexOf("undefined") >0)
			{
				this.test.assert(false, 'Service de controle du numero lors de l inscription');
				this.capture('erreur_inscription_test_numero_'+getDate()+'.png');
			}
		}else
			this.test.assert(true, 'Controle numéro lors de l inscription');

	});

	//controle unicité des numéros
	/*casper.then(function (){
				this.sendKeys('#NUM_TELEPHONE', login,{reset: true});
				this.click('#envoyer');
				if (this.exists('.error')) {
					var error_text = this.getElementInfo(".error");
					
					if ((error_text.text).indexOf("mot de passe oublié") <=0)
					{
						this.test.assert(false, "Controle d unicite des numeros "+login);
						this.capture('erreur_unicite_test_numero_'+getDate()+'.png');
					}else
						this.test.assert(true, "Controle d unicite des numeros "+login);
				}else
						this.test.assert(false, "Controle d unicite des numeros "+login);
	});*/

	//affichage bouton connexion
	casper.thenOpen(url1+'/avantages-m6mobile.html').waitForSelector('.user-connected', 

		function then() {
		    //this.mouse.click('#btnLoginHeader');
			this.test.assert(true, "affichage bouton connexion");

		},
		function timeout(){
				this.capture('connexion.png');
				this.test.assert(false, "affichage bouton connexion");
		});

	//connexion par header
	casper.then(function (){
		this.mouse.click('.user-connected');
		this.capture('connexionHeader.png');
		this.sendKeys('#chmailorphone', loginHeader);
		this.sendKeys('#MOT_DE_PASSE_HEADER', pwd);
		this.mouse.click('#loginBtn_header');
		
		casper.thenClick('#loginBtn_header',function(){
			this.waitForSelector('#btnDisconnectHeader',
				function then(){
					this.test.assert(true, "Connexion via header");
				}, 
				function timeout() { // step to execute if check has failed
					this.capture('erreur_connexionHeader.png');
					this.test.assert(false, "Connexion via header");
						
				},waitTimeout);
		});
	});



casper.run(function() {
    this.test.done();
  });
});




casper.run();
