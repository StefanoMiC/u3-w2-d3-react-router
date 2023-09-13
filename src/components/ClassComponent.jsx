import { Component } from "react";
import withRouter from "../helpers/withRouter";

class ClassComponent extends Component {
  render() {
    console.log(this.props);
    return <div>Sono un class component, l'id dinamico è: {this.props.params.dynamicId}</div>;
  }
}

export default withRouter(ClassComponent);
