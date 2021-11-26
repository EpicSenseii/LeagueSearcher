var app = new Vue({
  el: "#app",
  data () {
    return {
      API_KEY: "RGAPI-86cba176-cfbd-46dd-8875-c6b58d67852e",
      IconCall: "",
      data : "",
      showCard: "",
      showInGame: "",
      // gameStatut: "",
    }
  },

  methods: {
    
    async getPlayer() {
      this.searchText = document.querySelector(".searchText").value;
      this.APICall = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.searchText + "?api_key=" + this.API_KEY;
      // console.log(this.searchText);
      // console.log(this.APICall);
      const response = await fetch(this.APICall);
      this.data = await response.json();
      console.log(this.data);
      this.IconCall = "http://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/" + this.data.profileIconId + ".png";
      
      this.toggleCard()
      this.toggleInGame()
      this.getGameStatut()
      this.getMasteries()
    },
    
    toggleCard() {
      JSON.stringify(this.data) != '{}' ? this.showCard=true : this.showCard=false;
    },
    toggleInGame() {
      JSON.stringify(this.gameStatut) != '{}' ? this.showInGame=true : this.showInGame=false;
    },

    async getGameStatut() {
     this.GameAPI = "https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + this.data.id + "?api_key=" + this.API_KEY;
     const res = await fetch(this.GameAPI);
     this.gameStatut = await res.json();
     console.log(this.gameStatut);
    },

    async getMasteries() {
      this.championID = "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + this.data.id + "?api_key=" + this.API_KEY;;
      const res = await fetch(this.championID);
      this.champMasteries = await res.json();

      this.champ1 = this.champMasteries[0].championId;
      this.champ1lvl = this.champMasteries[0].championLevel;
      this.champ2 = this.champMasteries[1].championId;
      this.champ2lvl = this.champMasteries[1].championLevel;
      this.champ3 = this.champMasteries[2].championId;
      this.champ3lvl = this.champMasteries[2].championLevel;

      // console.log(this.champ1);

      this.masteriesAPI = "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + this.data.id + "/by-champion/" + this.champ1 + "?api_key=" + this.API_KEY;

      // console.log(this.masteriesAPI);

      // http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json
      // http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/Aatrox.png
    },
  },
});
