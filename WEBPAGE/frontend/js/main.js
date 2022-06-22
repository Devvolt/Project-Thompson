code = undefined;
discordUser = undefined;
$(function () {
  if (location.href.indexOf("code") !== -1) {
    // Detect if you logged in or not
    code = location.href.substring(
      location.href.indexOf("code") + 5,
      location.href.length
    );
    const req = new XMLHttpRequest();
    req.open("POST", "https://vollex.cc/user");
    req.send(code);
    req.onload = () => {
      if (req.status === 500) {
        $("#errore-status").text(
          "Errore nell'autenticazione. Ricarica la pagina [" + req.status + "]"
        );
        let i = 5;
        setInterval(() => {
          $("#errore").text(
            "Verrai renderizzato alla pagina principale in " + i + " secondi"
          );
          i = i - 1;
        }, 1000);

        setTimeout(() => {
          window.location.href = "https://vollex.cc/";
        }, 5000);
      } else if (req.status === 200) {
          response = JSON.parse(req.responseText);
        discordUser = response.user;
        coins = response.coins;
        console.log(discordUser);
        $("#quiz-section").show();
        $("#welcome_txt").text("Benvenuto " + discordUser.username + coins);
      } else {
        $("#errore").text("Errore imprevisto [" + req.status + "]");
      }
    };
  } else {
    $("#welcome-section").show();
  }
});


