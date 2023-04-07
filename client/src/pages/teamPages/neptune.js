import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";

class neptune extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arcubs here. Each person's array will include three NBA teams. 
        allNBA: [],
        neptuneNBA: "",
        bucks: "",
        sixers: "",
        cavs: "",
        // NFL STARTING HERE 
        // rams: 90,
        // jaguars: 60,
        // giants: 40,
        // totalNFL: 190,
        // EPL Starting HERE 
        leicester: "",
        norwich: "",
        neptuneEPL: "",
        // NHL Going here. 
        flyers: "",
        stars: "",
        sabres: "",
        totalNHL: "",
        // Golf here
        spieth: "",
        ancer: "",
        zalatoris: "",
        matsuyama: "",
        fleetwood: "",
        totalGolf: "",
        // MLB Here
        cubs: 74,
        stars: 68,
        pirates: 62,
        totalMLB: 204
    }
    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresEPL();
        this.getScoresNHL();
        this.getScoresPGA();
        // this.getScoresMLB();
        this.getScoresNFL();
    };

    getScoresNFL = () => {
        var x = golfHelper();
        this.setState({ colts: x.Colts });
        this.setState({ cardinals: x.Cardinals });
        this.setState({ patriots: x.Patriots });
        var allNFL = (x.Colts + x.Cardinals + x.Patriots)
        this.setState({ totalNFL: allNFL });
    };


    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                var cubsWin;
                var starsWin;
                var piratesWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )

                    // cubs
                    if (fullIndex[i].team.id === 6) {
                        cubsWin = fullIndex[i].games.win.total
                    }

                    // pirates
                    if (fullIndex[i].team.id === 28) {
                        piratesWin = fullIndex[i].games.win.total
                    }

                    // stars
                    if (fullIndex[i].team.id === 35) {
                        starsWin = fullIndex[i].games.win.total
                    }

                }

                var allMLB = cubsWin + piratesWin + starsWin;

                this.setState({ totalMLB: allMLB });
                this.setState({ cubs: cubsWin });
                this.setState({ pirates: piratesWin });
                this.setState({ stars: starsWin });

            });
    };

    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ ancer: x.Ancer });
        this.setState({ spieth: x.Spieth });
        this.setState({ zalatoris: x.Zalatoris });
        this.setState({ matsuyama: x.Matsuyama });
        this.setState({ fleetwood: x.Fleetwood });
        var allGolf = x.Fleetwood + x.Zalatoris + x.Spieth + x.Matsuyama + x.Ancer;
        this.setState({ totalGolf: allGolf });
    }

    getScoresNHL = () => {
        API.getScoresNHL()
            .then(res => {
                // This is the Metro Division
                var metroResults = res.data.records[0].teamRecords;
                // Atlantic Division
                var atlanticResults = res.data.records[1].teamRecords;
                // // Central Division
                var centralResults = res.data.records[2].teamRecords;
                // Pacific
                var pacificResults = res.data.records[3].teamRecords;

                console.log(metroResults);
                var flyersWins;
                var flyersOTLS;
                var flyersTotal;
                var starsWins;
                var starsOTLS;
                var starsTotal;
                var sabresWins;
                var sabresOTLS;
                var sabresTotal;
                var allNHL;

                // Here is the stars loop. 
                for (var i = 0; i < centralResults.length; i++) {
                    // stars
                    if (centralResults[i].team.id === 25) {
                        starsWins = centralResults[i].leagueRecord.wins;
                        starsOTLS = centralResults[i].leagueRecord.ot;
                        console.log(starsWins);
                        console.log(starsOTLS);
                        console.log("this loop is running")
                    }

                }


                // Here is the flyers loop. 
                for (var i = 0; i < metroResults.length; i++) {
                    // flyers
                    if (metroResults[i].team.id === 4) {
                        flyersWins = metroResults[i].leagueRecord.wins;
                        flyersOTLS = metroResults[i].leagueRecord.ot;
                        console.log(flyersWins);
                        console.log(flyersOTLS);
                        console.log("this loop is running")
                    }
                }


                // Here is the loop for the sabres
                for (var i = 0; i < atlanticResults.length; i++) {

                    // sabres
                    if (atlanticResults[i].team.id === 7) {
                        sabresWins = atlanticResults[i].leagueRecord.wins;
                        sabresOTLS = atlanticResults[i].leagueRecord.ot;
                        console.log(sabresWins);
                        console.log(sabresOTLS);
                        console.log("this loop is running")
                    }
                }

                // stars total
                starsTotal = (starsWins * 2) + starsOTLS;
                console.log(starsTotal);

                // flyers total
                flyersTotal = (flyersWins * 2) + flyersOTLS;
                console.log(flyersTotal);

                // stars total
                sabresTotal = (sabresWins * 2) + sabresOTLS;
                console.log(sabresTotal);

                var allNHL = flyersTotal + starsTotal + sabresTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ flyers: flyersTotal });
                this.setState({ stars: starsTotal });
                this.setState({ sabres: sabresTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                console.log(res.data.response[0].league.standings[0])
                 //   Starting Neptune EPL Here 
                 var newcastleWin;
                 var newcastleTie;
                 var wolvesWin;
                 var wolvesTie;
 
                 // running the for loop here. 
                 var forLoopArray = res.data.response[0].league.standings[0]
                 for (var i = 0; i < forLoopArray.length; i++) {
 
                     if (forLoopArray[i].team.id === 34) {
                         newcastleWin = forLoopArray[i].all.win
                         newcastleTie = forLoopArray[i].all.draw
                         //then so something
                         //return something here
                         console.log("here are the wins" + newcastleWin);
                         console.log("here are the ties" + newcastleTie);
                     }
 
                     if (forLoopArray[i].team.id === 39) {
                         wolvesWin = forLoopArray[i].all.win
                         wolvesTie = forLoopArray[i].all.draw
                         //then so something
                         //return something here
                         console.log("here are the wins" + wolvesWin);
                         console.log("here are the ties" + wolvesTie);
                     }
                 }
 
                 var newcastleTotal = (newcastleWin * 4.25) + (newcastleTie);
                 var wolvesTotal = (wolvesWin * 4.25) + (wolvesTie);
 
                 // Here is the final result
                 var neptunePoints = newcastleTotal + wolvesTotal;
                 this.setState({ neptuneEPL: neptunePoints });

                // Here is the final result
                var neptunePoints = newcastleTotal + wolvesTotal;
                this.setState({ newcastle: newcastleTotal });
                this.setState({ wolves: wolvesTotal });
                this.setState({ eplTotal: neptunePoints });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresNBA = () => {
        API.getScoresNBA()
            .then(res => {
                // HERE ARE NBA TEAMS FOR TOMMY. 
                // console.log(res);
                // console.log(res.data.api.standings);
                var bucksWin = res.data.api.standings[5].win;
                var sixersWin = res.data.api.standings[1].win;
                var cavsWin = res.data.api.standings[6].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doublebucks = (bucksWin * 2);
                var doublesixers = (sixersWin * 2);
                var doublecavs = (cavsWin * 2);

                const tempNeptuneNBA = this.state.allNBA;

                tempNeptuneNBA.push(bucksWin);
                tempNeptuneNBA.push(sixersWin);
                tempNeptuneNBA.push(cavsWin);

                var NeptuneDoubledScores = tempNeptuneNBA.map(team => team * 2);

                var NeptunePoints = 0;

                for (var i = 0; i < NeptuneDoubledScores.length; i++) {
                    NeptunePoints += NeptuneDoubledScores[i];
                }
                console.log(NeptunePoints);
                this.setState({ neptuneNBA: NeptunePoints });
                this.setState({ bucks: doublebucks });
                this.setState({ sixers: doublesixers });
                this.setState({ cavs: doublecavs });
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div class="text-center">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="/Home">Epic Fantasy League</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/Home">Standings <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item active">
                                <div class="dropdown show">
                                    <div class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Teams
                                    </div>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item" href="tommy">Tommy</a>
                                        <a class="dropdown-item" href="patrick">Patrick</a>
                                        <a class="dropdown-item" href="james">James</a>
                                        <a class="dropdown-item" href="neptune">Neptune</a>
                                        <a class="dropdown-item" href="dj">DJ</a>
                                        <a class="dropdown-item" href="goose">Goose</a>
                                        <a class="dropdown-item" href="al">Al</a>
                                        <a class="dropdown-item" href="joe">Joe</a>
                                        <a class="dropdown-item" href="steids">Steids</a>
                                        <a class="dropdown-item" href="ben">Eres</a>
                                    </div>
                                </div>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" href="/Login">Login</a>
                            </li> */}
                            <li class="nav-item">
                                <a class="nav-link" href="/draft">Draft Results</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/points">Points System</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="card">
                    <div class="card-body text-center bg-light text-secondary">
                        Neptune
                    </div>
                </div>

                {/* Starting my new table here */}
                <div class="container smallTable">
                    <div class="row">
                        <div class="col">
                            <table class="table table-striped table-bordered table-hover">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col-6">Draft Pick</th>
                                        <th scope="col-6">NBA Team</th>
                                        <th scope="col-6">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td className="bucks">Milwaukee Bucks</td>
                                        <td>{this.state.bucks}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">16</th>
                                        <td className="sixers">Philadelphia 76ers</td>
                                        <td>{this.state.sixers}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">40</th>
                                        <td className="cavs">Cleveland Cavaliers</td>
                                        <td>{this.state.cavs}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.neptuneNBA}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Here is NFL */}
                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">NFL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">34</th>
                                                <td className="cardinals">Arizona Cardinals</td>
                                                <td>{this.state.cardinals}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">102</th>
                                                <td className="patriots">New England Patriots</td>
                                                <td>{this.state.patriots}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">130</th>
                                                <td className="colts">Indianapolis Colts </td>
                                                <td>{this.state.colts}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalNFL}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    {/* Here is EPL */}
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">EPL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">21</th>
                                                <td className="newcastle">Newcastle</td>
                                                <td>{this.state.newcastle}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">120</th>
                                                <td className="wolverhampton">Wolves</td>
                                                <td>{this.state.wolves}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.eplTotal}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Adding the NHL Table here */}
                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    {/* Here is NHL */}
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">NHL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">86</th>
                                                <td className="stars">Dallas Stars</td>
                                                <td>{this.state.stars}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">126</th>
                                                <td className="flyers">Philadelphia Flyers</td>
                                                <td>{this.state.flyers}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">154</th>
                                                <td className="sabres">Buffalo Sabres</td>
                                                <td>{this.state.sabres}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalNHL}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* MLB Here */}

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">MLB Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">158</th>
                                                <td className="cubs">Chicago Cubs</td>
                                                <td>{this.state.cubs}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">170</th>
                                                <td className="stars">Texas stars</td>
                                                <td>{this.state.stars}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">171</th>
                                                <td className="pirates">Pittsburgh Pirates</td>
                                                <td>{this.state.pirates}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalMLB}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        {/* Adding Golf Here */}

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">Golfer</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">27</th>
                                                <td className="senators">Jordan Spieth</td>
                                                <td>{this.state.spieth}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">58</th>
                                                <td className="senators">Abraham Ancer</td>
                                                <td>{this.state.ancer}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">70</th>
                                                <td className="senators">Will Zalatoris</td>
                                                <td>{this.state.zalatoris}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">71</th>
                                                <td className="senators">Hideki Matsuyama</td>
                                                <td>{this.state.matsuyama}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">188</th>
                                                <td className="senators">Tommy Fleetwood</td>
                                                <td>{this.state.fleetwood}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.totalGolf}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <body class="d-flex flex-column">
                    <div id="page-content">
                        <div class="container text-center">
                            <div class="row justify-content-center">
                                <div class="col-md-7">
                                    {/* Adding this custom footer I found online. Requires some fake text. Here it is below.  */}
                                    <h1 class="font-weight-light mt-4 text-white">Sticky Footer using Flexbox</h1>
                                    <p class="lead text-white-50">Use just two Bootstrap 4 utility classes and three custom CSS rules and you will have a flexbox enabled sticky footer for your website!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer id="sticky-footer" class="py-2 bg-dark text-white-50">
                        <div class="container text-center">
                            <small>Copyright &copy; Epic Fantasy League 2020</small>
                        </div>
                    </footer>
                </body>
            </div>
        )
    }
}

export default neptune;