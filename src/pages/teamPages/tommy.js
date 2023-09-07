import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";
// import { mlbHelper } from "../../middleware/mlb";
import { Link } from "react-router-dom";

class tommy extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arrays here. Each person's array will include three NBA teams. 
        allNBA: [],
        tomNBA: "",
        hawks: "",
        bulls: "",
        pistons: "",
        // NFL Here
        // fourtyNiners: 130,
        // seahawks: 110,
        // patriots: 120,
        // totalNFL: 360,
        // Adding EPL Results Here:
        arsenal: "",
        wolves: "",
        eplTotal: "",
        // NHL States here 
        coyotes: "",
        blueJackets: "",
        canadians: "",
        totalNHL: "",
        // Golf here
        fitzpatrick: "",
        finau: "",
        mcnealy: "",
        kim: "",
        bradley: "",
        totalGolf: "",
        // MLB Here
        rays: "",
        dBacks: "",
        phillies: "",
        tomMLB: "",
    }

    componentDidMount = () => {
        this.getScoresNBA();
        this.getScoresNHL();
        this.getScoresEPL();
        this.getScoresPGA();
        this.getScoresMLB();
        this.getScoresNFL();
    }

    getScoresNFL = () => {
        var x = golfHelper();
        this.setState({ eagles: x.Eagles });
        this.setState({ cowboys: x.Cowboys });
        this.setState({ bucs: x.Cucs });
        var allNFL = (x.Eagles + x.Cowboys + x.Bucs)
        this.setState({ totalNFL: allNFL });
    }

    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ finau: x.Finau });
        this.setState({ fitzpatrick: x.Fitzpatrick });
        this.setState({ mcnealy: x.McNealy });
        this.setState({ kim: x.Kim });
        this.setState({ bradley: x.Bradley });
        var allGolf = x.McNealy + x.Finau + x.Fitzpatrick + x.Kim + x.Bradley;
        this.setState({ totalGolf: allGolf });
    }

    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                // Tommy MLB 
                var raysWin;
                var philliesWin;
                var dBacksWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )

                    // rays
                    if (fullIndex[i].team.id === 34) {
                        raysWin = fullIndex[i].games.win.total
                    }

                    // phillies
                    if (fullIndex[i].team.id === 27) {
                        philliesWin = fullIndex[i].games.win.total
                    }

                    // dBacks
                    if (fullIndex[i].team.id === 2) {
                        dBacksWin = fullIndex[i].games.win.total
                    }

                }
                var totalTom = raysWin + dBacksWin + philliesWin;
                this.setState({ tomMLB: totalTom });
                this.setState({ rays: raysWin });
                this.setState({ phillies: philliesWin });
                this.setState({ dBacks: dBacksWin });

            });
    };

    getScoresNHL = () => {
        API.getScoresNHL()
            .then(res => {
                // This is the Metro Division
                var metroResults = res.data.records[0].teamRecords;
                // // Atlantic Division
                var atlanticResults = res.data.records[1].teamRecords;
                // Central Division
                var centralResults = res.data.records[2].teamRecords;
                // Pacific
                var pacificResults = res.data.records[3].teamRecords;

                console.log(atlanticResults)
                var blueJacketsWins;
                var blueJacketsOTLS;
                var blueJacketsTotal;
                var coyotesWins;
                var coyotesOTLS;
                var coyotesTotal;
                var canadiansWins;
                var canadiansOTLS;
                var canadiansTotal;
                var totalNHL;

                // Here is the blueJackets for loop. 
                for (var i = 0; i < metroResults.length; i++) {

                    if (metroResults[i].team.id === 29) {
                        blueJacketsWins = metroResults[i].leagueRecord.wins;
                        blueJacketsOTLS = metroResults[i].leagueRecord.ot;
                        // console.log(blueJacketsWins);
                        // console.log(blueJacketsOTLS);
                        // console.log("this loop is running")
                    }
                }
                // coyotes total
                blueJacketsTotal = (blueJacketsWins * 2) + blueJacketsOTLS;
                console.log(blueJacketsTotal)

                // Here is the loop for the canadians and blueJackets, who are in the same division. 
                for (var i = 0; i < centralResults.length; i++) {

                    // coyotes
                    if (centralResults[i].team.id === 53) {
                        coyotesWins = centralResults[i].leagueRecord.wins;
                        coyotesOTLS = centralResults[i].leagueRecord.ot;
                        // console.log(coyotesWins);
                        // console.log(coyotesOTLS);
                        // console.log("this loop is running")
                    }
                }

                // Here is the blueJackets for loop. 
                for (var i = 0; i < atlanticResults.length; i++) {

                    // canadians
                    if (atlanticResults[i].team.id === 8) {
                        canadiansWins = atlanticResults[i].leagueRecord.wins;
                        canadiansOTLS = atlanticResults[i].leagueRecord.ot;
                        // console.log(canadiansWins);
                        // console.log(canadiansOTLS);
                        // console.log("this loop is running")
                    }
                }
                // blueJackets total
                blueJacketsTotal = (blueJacketsWins * 2) + blueJacketsOTLS;
                console.log(blueJacketsTotal)

                // coyotes total
                coyotesTotal = (coyotesWins * 2) + coyotesOTLS;
                console.log(coyotesTotal);

                // canadians total
                canadiansTotal = (canadiansWins * 2) + canadiansOTLS;
                console.log(canadiansTotal);

                var allNHL = blueJacketsTotal + canadiansTotal + coyotesTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ blueJackets: blueJacketsTotal });
                this.setState({ canadians: canadiansTotal });
                this.setState({ coyotes: coyotesTotal });

            })
            .catch(error => {
                console.log(error)
            });
    }

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                // HERE ARE EPL TEAMS FOR TOMMY. 
                //  arsenal
                console.log(res.data.response[0].league.standings[0])
                var liverpoolWin;
                var liverpoolTie;
                var brightonWin;
                var brightonTie;

                // running the for loop here. 
                var forLoopArray = res.data.response[0].league.standings[0]
                for (var i = 0; i < forLoopArray.length; i++) {

                    if (forLoopArray[i].team.id === 40) {
                        liverpoolWin = forLoopArray[i].all.win
                        liverpoolTie = forLoopArray[i].all.draw
                    }

                    if (forLoopArray[i].team.id === 51) {
                        brightonWin = forLoopArray[i].all.win
                        brightonTie = forLoopArray[i].all.draw
                    }
                }

                var liverpoolTotal = (liverpoolWin * 4.25) + (liverpoolTie);
                var brightonTotal = (brightonWin * 4.25) + (brightonTie);

                // Here is the final result
                var tomPoints = liverpoolTotal + brightonTotal;
                this.setState({ tomEPL: tomPoints });
                var liverpoolTotal = (liverpoolWin * 4.25) + (liverpoolTie);
                var brightonTotal = (brightonWin * 4.25) + (brightonTie);

                // Here is the final result
                var tomPoints = liverpoolTotal + brightonTotal;
                this.setState({ liverpool: liverpoolTotal });
                this.setState({ brighton: brightonTotal });
                this.setState({ eplTotal: tomPoints });

                // And now I need to run the totalscores function so that it can get logged. 
                // this.totalScores();

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
                console.log(res.data.api.standings);
                var hawksWin = res.data.api.standings[11].win;
                var bullsWin = res.data.api.standings[7].win;
                var pistonsWin = res.data.api.standings[9].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doublehawks = (hawksWin * 2);
                var doublebulls = (bullsWin * 2);
                var doublepistons = (pistonsWin * 2);

                const tempTomNBA = this.state.allNBA;

                tempTomNBA.push(hawksWin);
                tempTomNBA.push(bullsWin);
                tempTomNBA.push(pistonsWin);

                var tomDoubledScores = tempTomNBA.map(team => team * 2);

                var TomPoints = 0;

                for (var i = 0; i < tomDoubledScores.length; i++) {
                    TomPoints += tomDoubledScores[i];
                }
                console.log(TomPoints);
                this.setState({ tomNBA: TomPoints });
                this.setState({ hawks: doublehawks });
                this.setState({ bulls: doublebulls });
                this.setState({ pistons: doublepistons });
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
                                <Link class="nav-link"  to="/Home">Standings</Link>
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
                        Tommy
                    </div>
                </div>
                {/* Starting my new tables here */}
                <div class="container smallTable">
                    <div class="row">
                        <div class="col">
                            {/* Here is NBA */}
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
                                        <th scope="row">46</th>
                                        <td className="hawks">Atlanta Hawks</td>
                                        <td>{this.state.hawks}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">55</th>
                                        <td className="bulls">Chicago Bulls</td>
                                        <td>{this.state.bulls}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">109</th>
                                        <td className="pistons">Detroit Pistons</td>
                                        <td>{this.state.pistons}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.tomNBA}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    {/* Here is NFL */}
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
                                                <th scope="row">12</th>
                                                <td className="eagles">Philadelphia Eagles</td>
                                                <td>{this.state.eagles}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">37</th>
                                                <td className="cowboys"> Dallas Cowboys</td>
                                                <td>{this.state.cowboys}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">65</th>
                                                <td className="bucs">Tampa Bay Bucs</td>
                                                <td>{this.state.bucs}</td>
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
                                                <th scope="row">9</th>
                                                <td className="liverpool">Liverpool</td>
                                                <td>{this.state.liverpool}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">24</th>
                                                <td className="brighton">Brighton and Hove Albion</td>
                                                <td>{this.state.brighton}</td>
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
                                                <th scope="row">160</th>
                                                <td className="blueJackets">Columbus Blue Jackets</td>
                                                <td>{this.state.blueJackets}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">178</th>
                                                <td className="coyotes">Phoenix Coyotes</td>
                                                <td>{this.state.coyotes}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">184</th>
                                                <td className="canadiens">Montreal Canadians</td>
                                                <td>{this.state.canadians}</td>
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
                                                <th scope="row">76</th>
                                                <td className="phillies">Philadelphia Phillies</td>
                                                <td>{this.state.phillies}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">90</th>
                                                <td className="rays">Tampa Bay Rays</td>
                                                <td>{this.state.rays}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">112</th>
                                                <td className="diamondbacks">Arizona Diamondbacks</td>
                                                <td>{this.state.dBacks}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Total</th>
                                                <td></td>
                                                <td>{this.state.tomMLB}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Golf Here */}

                        <div class="container smallTable">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">Golfer (Drop Two Worst)</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">91</th>
                                                <td className="canadiens">Tony Finau</td>
                                                <td>{this.state.finau}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">122</th>
                                                <td className="mariners">Matt Fitzpatrick</td>
                                                <td>{this.state.fitzpatrick}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">139</th>
                                                <td className="ravens">Tom Kim</td>
                                                <td>{this.state.kim}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">141</th>
                                                <td className="colts">Keegan Bradley</td>
                                                <td>{this.state.bradley}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">163</th>
                                                <td className="canadiens">Maverick McNealy</td>
                                                <td>{this.state.mcnealy}</td>
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

export default tommy;