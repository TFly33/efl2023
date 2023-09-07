import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";
import { Link } from "react-router-dom";

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
        // falcons: 90,
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
        schauffele: "",
        scheffler: "",
        cantlay: "",
        woods: "",
        herbert: "",
        totalGolf: "",
        // MLB Here
        orioles: "",
        stars: "",
        reds: "",
        totalMLB: ""
    }
    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresEPL();
        this.getScoresNHL();
        this.getScoresPGA();
        this.getScoresMLB();
        this.getScoresNFL();
    };

    getScoresNFL = () => {
        var x = golfHelper();
        this.setState({ bears: x.Bears });
        this.setState({ giants: x.Giants });
        this.setState({ falcons: x.Falcons });
        var allNFL = (x.Bears + x.Giants + x.Falcons)
        this.setState({ totalNFL: allNFL });
    };


    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                // Neptune MLB 
                var oriolesWin;
                var redsWin;
                var royalsWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )

                    // orioles
                    if (fullIndex[i].team.id === 4) {
                        oriolesWin = fullIndex[i].games.win.total
                    }

                    // reds
                    if (fullIndex[i].team.id === 8) {
                        redsWin = fullIndex[i].games.win.total
                    }

                    // royals
                    if (fullIndex[i].team.id === 16) {
                        royalsWin = fullIndex[i].games.win.total
                    }

                }
                var allMLB = oriolesWin + royalsWin + redsWin;
                this.setState({ totalMLB: allMLB });
                this.setState({ orioles: oriolesWin });
                this.setState({ reds: redsWin });
                this.setState({ royals: royalsWin });

            });
    };

    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ scheffler: x.Scheffler });
        this.setState({ schauffele: x.Schauffele });
        this.setState({ cantlay: x.Cantlay });
        this.setState({ woods: x.Woods });
        this.setState({ herbert: x.Herbert });
        var allGolf = x.Herbert + x.Cantlay + x.Schauffele + x.Woods + x.Scheffler;
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
                    <Link class="navbar-brand"  to="/Home">Epic Fantasy League</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link"  to="/Home">Standings <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item active">
                                <div class="dropdown show">
                                    <div class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Teams
                                    </div>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <Link class="dropdown-item" to="/tommy">Tommy</Link>
                                        <Link class="dropdown-item" to="/patrick">Patrick</Link>
                                        <Link class="dropdown-item" to="/james">James</Link>
                                        <Link class="dropdown-item" to="/neptune">Neptune</Link>
                                        <Link class="dropdown-item" to="/dj">DJ</Link>
                                        <Link class="dropdown-item" to="/goose">Goose</Link>
                                        <Link class="dropdown-item" to="/al">Al</Link>
                                        <Link class="dropdown-item" to="/joe">Joe</Link>
                                        <Link class="dropdown-item" to="/steids">Steids</Link>
                                        <Link class="dropdown-item" to="/ben">Eres</Link>
                                    </div>
                                </div>
                            </li>
                            {/* <li class="nav-item">
                                <Link class="nav-link"  to="/Login">Login</Link>
                            </li> */}
                            <li class="nav-item">
                                <Link class="nav-link"  to="/draft">Draft Results</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link"  to="/points">Points System</Link>
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
                                                <th scope="row">72</th>
                                                <td className="giants">NY Giants</td>
                                                <td>{this.state.giants}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">101</th>
                                                <td className="falcons">Atlanta Falcons</td>
                                                <td>{this.state.falcons}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">165</th>
                                                <td className="bears">Chicago Bears </td>
                                                <td>{this.state.bears}</td>
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
                                                <th scope="row">95</th>
                                                <td className="orioles">Baltimore Orioles</td>
                                                <td>{this.state.orioles}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">147</th>
                                                <td className="reds">Cincinnati Reds</td>
                                                <td>{this.state.reds}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">135</th>
                                                <td className="royals">Kansas City Royals</td>
                                                <td>{this.state.royals}</td>
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
                                                <th scope="col-6">Golfer (Drop Lowest Two)</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">49</th>
                                                <td className="rockies">Scottie Scheffler</td>
                                                <td>{this.state.scheffler}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">52</th>
                                                <td className="eagles">Xander Schauffele</td>
                                                <td>{this.state.schauffele}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">70</th>
                                                <td className="flyers">Patrick Cantlay</td>
                                                <td>{this.state.cantlay}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">176</th>
                                                <td className="phillies">Tiger Woods</td>
                                                <td>{this.state.woods}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">183</th>
                                                <td className="cubs">Lucas Herbert</td>
                                                <td>{this.state.herbert}</td>
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