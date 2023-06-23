import React from "react";
import API from "../../utils/API";
import { golfHelper } from "../../middleware/helper";
import { Link } from "react-router-dom";

class goose extends React.Component {
    // Here is the function we will use for creating the actual table. 
    state = {
        allTeams: [],
        // Putting NBA arredSox here. Each person's array will include three NBA teams. 
        allNBA: [],
        gooseNBA: "",
        celtics: "",
        timberwolves: "",
        knicks: "",
        // chiefs: 120,
        // panthers: 50,
        // bengals: 20,
        // totalNFL: 190,
        // EPL
        crystal: "",
        westham: "",
        gooseEPL: "",
        // NHL Here
        redWings: "",
        blackhawks: "",
        bruins: "",
        // Golf here
        im: "",
        hovland: "",
        pereira: "",
        power: "",
        grillo: "",
        totalGolf: "",
        // MLB Here
        redSox: "",
        rockies: "",
        rangers: "",
        totalMLB: ""

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
        this.setState({ bills: x.Bills });
        this.setState({ eagles: x.Eagles });
        this.setState({ giants: x.Giants });
        var allNFL = (x.Bills + x.Eagles + x.Giants)
        this.setState({ totalNFL: allNFL });
    };

    getScoresMLB = () => {
        API.getScoresMLB()
            .then(res => {
                console.log(res.data.response[0]);
                var fullIndex = res.data.response[0];
                var redSoxWin;
                var rangersWin;
                var rockiesWin;

                for (var i = 0; i < fullIndex.length; i++) {
                    console.log("This loop is running."
                    )
                    // redSox
                    if (fullIndex[i].team.id === 5) {
                        redSoxWin = fullIndex[i].games.win.total
                    }

                    // rangers
                    if (fullIndex[i].team.id === 35) {
                        rangersWin = fullIndex[i].games.win.total
                    }

                    // rockies
                    if (fullIndex[i].team.id === 10) {
                        rockiesWin = fullIndex[i].games.win.total
                    }
                }
                var allMLB = redSoxWin + rockiesWin + rangersWin;

                this.setState({ totalMLB: allMLB });
                this.setState({ redSox: redSoxWin });
                this.setState({ rangers: rangersWin });
                this.setState({ rockies: rockiesWin });

            });
    };

    getScoresPGA = () => {
        var x = golfHelper();
        Object.keys(x).forEach((key) => { x[key] = x[key] / 20 })
        this.setState({ hovland: x.Hovland });
        this.setState({ im: x.Im });
        this.setState({ pereira: x.Pereira });
        this.setState({ power: x.Power });
        this.setState({ grillo: x.Grillo });
        var allGolf = x.Grillo + x.Hovland + x.Pereira + x.Power + x.Im;
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
                var redWingsWins;
                var redWingsOTLS;
                var redWingsTotal;
                var blackhawksWins;
                var blackhawksOTLS;
                var blackhawksTotal;
                var bruinsWins;
                var bruinsOTLS;
                var bruinsTotal;
                var allNHL;

                // Here is the redWings and blackhawks loop. 
                for (var i = 0; i < atlanticResults.length; i++) {
                    // redWings
                    if (atlanticResults[i].team.id === 17) {
                        redWingsWins = atlanticResults[i].leagueRecord.wins;
                        redWingsOTLS = atlanticResults[i].leagueRecord.ot;
                        console.log(redWingsWins);
                        console.log(redWingsOTLS);
                        console.log("this loop is running")
                    }

                    // blackhawks
                    if (centralResults[i].team.id === 16) {
                        blackhawksWins = centralResults[i].leagueRecord.wins;
                        blackhawksOTLS = centralResults[i].leagueRecord.ot;
                        console.log(blackhawksWins);
                        console.log(blackhawksOTLS);
                        console.log("this loop is running")
                    }
                }

                for (var i = 0; i < atlanticResults.length; i++) {

                    // bruins
                    if (atlanticResults[i].team.id === 6) {
                        bruinsWins = atlanticResults[i].leagueRecord.wins;
                        bruinsOTLS = atlanticResults[i].leagueRecord.ot;
                        console.log(bruinsWins);
                        console.log(bruinsOTLS);
                        console.log("this loop is running")
                    }
                }

                // redWings total
                redWingsTotal = (redWingsWins * 2) + redWingsOTLS;
                console.log(redWingsTotal);

                // blackhawks total
                blackhawksTotal = (blackhawksWins * 2) + blackhawksOTLS;
                console.log(blackhawksTotal)

                // bruins total
                bruinsTotal = (bruinsWins * 2) + bruinsOTLS;
                console.log(bruinsTotal);

                var allNHL = redWingsTotal + blackhawksTotal + bruinsTotal

                this.setState({ totalNHL: allNHL });
                this.setState({ redWings: redWingsTotal });
                this.setState({ blackhawks: blackhawksTotal });
                this.setState({ bruins: bruinsTotal });

            })
            .catch(error => {
                console.log(error)
            });
    };

    getScoresEPL = () => {
        API.getScoresEPL()
            .then(res => {
                // Goose EPL here
                var arsenalWin;
                var arsenalTie;
                var crystalPalaceWin;
                var crystalPalaceTie;

                // running the for loop here. 
                var forLoopArray = res.data.response[0].league.standings[0]
                for (var i = 0; i < forLoopArray.length; i++) {

                    if (forLoopArray[i].team.id === 42) {
                        arsenalWin = forLoopArray[i].all.win
                        arsenalTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + arsenalWin);
                        console.log("here are the ties" + arsenalTie);
                    }

                    if (forLoopArray[i].team.id === 52) {
                        crystalPalaceWin = forLoopArray[i].all.win
                        crystalPalaceTie = forLoopArray[i].all.draw
                        //then so something
                        //return something here
                        console.log("here are the wins" + crystalPalaceWin);
                        console.log("here are the ties" + crystalPalaceTie);
                    }
                }

                var arsenalTotal = (arsenalWin * 4.25) + (arsenalTie);
                var crystalPalaceTotal = (crystalPalaceWin * 4.25) + (crystalPalaceTie);

                // Here is the final result
                var goosePoints = crystalPalaceTotal + arsenalTotal;
                this.setState({ crystal: crystalPalaceTotal });
                this.setState({ arsenal: arsenalTotal });
                this.setState({ eplTotal: goosePoints });

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
                var celticsWin = res.data.api.standings[0].win;
                var timberwolvesWin = res.data.api.standings[16].win;
                var knicksWin = res.data.api.standings[2].win;

                // I need to multiply the API result by 2 FIRST since we need them individually. 

                var doubleceltics = (celticsWin * 2);
                var doubletimberwolves = (timberwolvesWin * 2);
                var doubleKnicks = (knicksWin * 2);

                const tempGooseNBA = this.state.allNBA;

                tempGooseNBA.push(celticsWin);
                tempGooseNBA.push(timberwolvesWin);
                tempGooseNBA.push(knicksWin);

                var GooseDoubledScores = tempGooseNBA.map(team => team * 2);

                var GoosePoints = 0;

                for (var i = 0; i < GooseDoubledScores.length; i++) {
                    GoosePoints += GooseDoubledScores[i];
                }
                console.log(GoosePoints);
                this.setState({ gooseNBA: GoosePoints });
                this.setState({ celtics: doubleceltics });
                this.setState({ timberwolves: doubletimberwolves });
                this.setState({ knicks: doubleKnicks });
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
                        Goose
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
                                        <th scope="row">18</th>
                                        <td className="celtics">Boston Celtics</td>
                                        <td>{this.state.celtics}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">34</th>
                                        <td className="tWolves">Minnesota Timberwolves</td>
                                        <td>{this.state.timberwolves}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">70</th>
                                        <td className="knicks">New York Knicks</td>
                                        <td>{this.state.knicks}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total</th>
                                        <td></td>
                                        <td>{this.state.gooseNBA}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Here is NFL */}
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <table class="table table-striped table-bordered table-hover smallTable">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">NFL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">10</th>
                                                <td className="bills">Buffalo Bills</td>
                                                <td>{this.state.bills}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">114</th>
                                                <td className="eagles">Philadelphia Eagles</td>
                                                <td>{this.state.eagles}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">138</th>
                                                <td className="giants">New York Giants</td>
                                                <td>{this.state.giants}</td>
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
                                    <table class="table table-striped table-bordered table-hover smallTable">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col-6">Draft Pick</th>
                                                <th scope="col-6">EPL Team</th>
                                                <th scope="col-6">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">71</th>
                                                <td className="crystalP">Crystal Palace</td>
                                                <td>{this.state.crystal}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td className="arsenal">Arsenal</td>
                                                <td>{this.state.arsenal}</td>
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
                                                <th scope="row">82</th>
                                                <td className="bruins">Boston Bruins</td>
                                                <td>{this.state.bruins}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">119</th>
                                                <td className="redwings">Detroit Red Wings</td>
                                                <td>{this.state.redWings}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">158</th>
                                                <td className="blackhawks">Chicago Blackhawks</td>
                                                <td>{this.state.blackhawks}</td>
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
                                                <th scope="row">99</th>
                                                <td className="redSox">Boston Red Sox</td>
                                                <td>{this.state.redSox}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">143</th>
                                                <td className="rockies">Colorado Rockies</td>
                                                <td>{this.state.rockies}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">130</th>
                                                <td className="rangers">Texas Rangers</td>
                                                <td>{this.state.rangers}</td>
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
                                                <th scope="row">102</th>
                                                <td className="reds">Viktor Hovland</td>
                                                <td>{this.state.hovland}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">131</th>
                                                <td className="cubs">Sung-jae Im</td>
                                                <td>{this.state.im}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">170</th>
                                                <td className="eagles">Mito Pereira</td>
                                                <td>{this.state.pereira}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">171</th>
                                                <td className="kings">Seamus Power</td>
                                                <td>{this.state.power}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">188</th>
                                                <td className="cowboys">Emiliano Grillo</td>
                                                <td>{this.state.grillo}</td>
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

export default goose;