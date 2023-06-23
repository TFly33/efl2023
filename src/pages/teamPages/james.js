import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";
import { Link } from "react-router-dom";

class james extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arrays here. Each person's array will include three NBA teams. 
        allNBA: [],
        jamesNBA: "",
        suns: "",
        raptors: "",
        rockets: "",
        saints: 130,
        falcons: 70,
        lions: 32.5,
        totalNFL: 232.5,
        // EPL States HEre
        manCity: "",
        brentford: "",
        jamesEPL: "",
        // NHL HERE
        rangers: "",
        canes: "",
        canucks: "",
        totalNHL: "",
        // Golf here
        hatton: "",
        burns: "",
        horschel: "",
        fleetwood: "",
        wise: "",
        totalGolf: "",
        // MLB Here
        jays: 106,
        athletics: 93,
        guardians: 87,
        totalMLB: 286
    }
    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresEPL();
        this.getScoresNHL();
        this.getScoresPGA();
        this.getScoresMLB();
        this.getScoresNFL();
    }

    getScoresNFL = () => {
        var x = golfHelper();
        this.setState({ rams: x.Rams });
        this.setState({ browns: x.Browns });
        this.setState({ steelers: x.Steelers });
        var allNFL = (x.Rams + x.Browns + x.Steelers)
        this.setState({ totalNFL: allNFL });
    };

    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                var jaysWin;
                var guardiansWin;
                var athleticsWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )

                    //jays
                    if (fullIndex[i].team.id === 36) {
                        jaysWin = fullIndex[i].games.win.total
                    }

                    //guardians
                    if (fullIndex[i].team.id === 9) {
                        guardiansWin = fullIndex[i].games.win.total
                    }

                    // athletics
                    if (fullIndex[i].team.id === 26) {
                        athleticsWin = fullIndex[i].games.win.total
                    }

                }
                var allMLB = jaysWin + athleticsWin + guardiansWin;
                

                this.setState({ totalMLB: allMLB });
                this.setState({ jays: jaysWin });
                this.setState({ guardians: guardiansWin });
                this.setState({ athletics: athleticsWin });

            });
    };

    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ burns: x.Burns });
        this.setState({ horschel: x.Horschel });
        this.setState({ hatton: x.Hatton });
        this.setState({ fleetwood: x.Fleetwood });
        this.setState({ wise: x.Wise });
        var allGolf = x.Wise + x.Burns + x.Hatton + x.Fleetwood + x.Horschel;
        this.setState({ totalGolf: allGolf });
    }

    getScoresNHL = () => {
        API.getScoresNHL()
            .then(res => {
                // This is the Metro Division
                var metroResults = res.data.records[0].teamRecords;
                // Atlantic Division
                var atlanticResults = res.data.records[1].teamRecords;
                // Central Division
                var centralResults = res.data.records[2].teamRecords;
                // central
                var pacificResults = res.data.records[3].teamRecords;

                console.log(centralResults);
                var rangersWins;
                var rangersOTLS;
                var rangersTotal;
                var canesWins;
                var canesOTLS;
                var canesTotal;
                var canucksWins;
                var canucksOTLS;
                var canucksTotal;
                var allNHL;

                // Here is the rangers loop. 
                for (var i = 0; i < metroResults.length; i++) {
                    // rangers
                    if (metroResults[i].team.id === 3) {
                        rangersWins = metroResults[i].leagueRecord.wins;
                        rangersOTLS = metroResults[i].leagueRecord.ot;
                        console.log(rangersWins);
                        console.log(rangersOTLS);
                        console.log("this loop is running")
                    }
                }


                // Here is the loop for the canes
                for (var i = 0; i < metroResults.length; i++) {

                    // canes
                    if (metroResults[i].team.id === 12) {
                        canesWins = metroResults[i].leagueRecord.wins;
                        canesOTLS = metroResults[i].leagueRecord.ot;
                        console.log(canesWins);
                        console.log(canesOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < pacificResults.length; i++) {

                    // canucks
                    if (pacificResults[i].team.id === 23) {
                        canucksWins = pacificResults[i].leagueRecord.wins;
                        canucksOTLS = pacificResults[i].leagueRecord.ot;
                        console.log(canucksWins);
                        console.log(canucksOTLS);
                        console.log("this loop is running")
                    }
                }

                // canes total
                canesTotal = (canesWins * 2) + canesOTLS;
                console.log(canesTotal)

                // canucks total
                canucksTotal = (canucksWins * 2) + canucksOTLS;
                console.log(canucksTotal);

                // rangers total
                rangersTotal = (rangersWins * 2) + rangersOTLS;
                console.log(rangersTotal);

                var allNHL = rangersTotal + canesTotal + canucksTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ rangers: rangersTotal });
                this.setState({ canes: canesTotal });
                this.setState({ canucks: canucksTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                console.log(res.data.response[0].league.standings[0])
               // James EPL here
               var manCityWin;
               var manCityTie;
               var brentfordWin;
               var brentfordTie;

               // running the for loop here. 
               var forLoopArray = res.data.response[0].league.standings[0]
               for (var i = 0; i < forLoopArray.length; i++) {

                   if (forLoopArray[i].team.id === 50) {
                       manCityWin = forLoopArray[i].all.win
                       manCityTie = forLoopArray[i].all.draw
                       //then so something
                       //return something here
                       console.log("here are the wins" + manCityWin);
                       console.log("here are the ties" + manCityTie);
                   }

                   if (forLoopArray[i].team.id === 55) {
                       brentfordWin = forLoopArray[i].all.win
                       brentfordTie = forLoopArray[i].all.draw
                       //then so something
                       //return something here
                       console.log("here are the wins" + brentfordWin);
                       console.log("here are the ties" + brentfordTie);
                   }
               }

               var manCityTotal = (manCityWin * 4.25) + (manCityTie);
               var brentfordTotal = (brentfordWin * 4.25) + (brentfordTie);

                // Here is the final result
                var jamesPoints = manCityTotal + brentfordTotal;
                this.setState({ manCity: manCityTotal });
                this.setState({ brentford: brentfordTotal });
                this.setState({ eplTotal: jamesPoints });
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
                var sunsWin = res.data.api.standings[21].win;
                var raptorsWin = res.data.api.standings[4].win;
                var rocketsWin = res.data.api.standings[29].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doublesuns = (sunsWin * 2);
                var doubleraptors = (raptorsWin * 2);
                var doublerockets = (rocketsWin * 2);

                const tempJamesNBA = this.state.allNBA;

                tempJamesNBA.push(sunsWin);
                tempJamesNBA.push(raptorsWin);
                tempJamesNBA.push(rocketsWin);

                var JamesDoubledScores = tempJamesNBA.map(team => team * 2);

                var JamesPoints = 0;

                for (var i = 0; i < JamesDoubledScores.length; i++) {
                    JamesPoints += JamesDoubledScores[i];
                }
                console.log(JamesPoints);
                this.setState({ jamesNBA: JamesPoints });
                this.setState({ suns: doublesuns });
                this.setState({ raptors: doubleraptors });
                this.setState({ rockets: doublerockets });
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
                        James
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
                                        <th scope="row">20</th>
                                        <td className="suns">Phoenix Suns</td>
                                        <td>{this.state.suns}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">45</th>
                                        <td className="raptors">Toronto Raptors</td>
                                        <td>{this.state.raptors}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">189</th>
                                        <td className="rockets">Houston Rockets</td>
                                        <td>{this.state.rockets}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.jamesNBA}</td>
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
                                                <th scope="row">22</th>
                                                <td className="rams">Los Angeles Rams</td>
                                                <td>{this.state.rams}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">39</th>
                                                <td className="browns">Cleveland Browns</td>
                                                <td>{this.state.browns}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">125</th>
                                                <td className="steelers">Pittsburgh Steelers</td>
                                                <td>{this.state.steelers}</td>
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
                                                <th scope="row">1</th>
                                                <td className="mancity">Manchester City</td>
                                                <td>{this.state.manCity}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">83</th>
                                                <td className="brentford"> Brentford</td>
                                                <td>{this.state.brentford}</td>
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
                                    {/* Here is NFL */}
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
                                                <th scope="row">30</th>
                                                <td className="hurricanes">Carolina Hurricanes</td>
                                                <td>{this.state.canes}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">73</th>
                                                <td className="rangers">New York Rangers </td>
                                                <td>{this.state.rangers}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">115</th>
                                                <td className="canucks">Vancouver Canucks</td>
                                                <td>{this.state.canucks}</td>
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
                                                <th scope="row">56</th>
                                                <td className="blueJays">Toronto Blue Jays</td>
                                                <td>{this.state.jays}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">179</th>
                                                <td className="athletics">Oakland Athletics</td>
                                                <td>{this.state.athletics}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">68</th>
                                                <td className="indians">Cleveland Guardians</td>
                                                <td>{this.state.guardians}</td>
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
                                                <th scope="row">124</th>
                                                <td className="cubs">Sam Burns</td>
                                                <td>{this.state.burns}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">137</th>
                                                <td className="chiefs">Billy Horschel</td>
                                                <td>{this.state.horschel}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">148</th>
                                                <td className="dodgers">Tyrell Hatton</td>
                                                <td>{this.state.hatton}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">153</th>
                                                <td className="mariners">Tommy Fleetwood</td>
                                                <td>{this.state.fleetwood}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">162</th>
                                                <td className="rays">Aaron Wise</td>
                                                <td>{this.state.wise}</td>
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

export default james;