import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import { getAllReloadLOcations } from '../../actions/reload_locaton_actions';

const columns = [ 
    {
    dataField: 'name',
    text: 'Reload Shop/Person'
    }, {
    dataField: 'location',
    text: 'Location'
    },{
        dataField: 'city',
        text: 'City'
    },{
        dataField: 'distance',
        text: 'Distance'
    }];

class reloadLocations extends Component {

    constructor(props) {
        super(props);
        this.state = {
          alllocations: [],
        };
    }

    componentDidMount() {
        this.props.getAllReloadLOcations();
    }

    componentWillReceiveProps = (nextProps) => {

        if (this.props.getalllocations !== nextProps.getalllocations) {
          this.setState({
            alllocations: nextProps.getalllocations,
          });
          console.log(nextProps.getalllocations)
        }
    
    };

    render() {
        return (
            <div className="container" style={{marginTop: '10%'}}>
                <p><b>Recharge Points / day pass stations</b></p>
                <BootstrapTable keyField='id' data={ this.state.alllocations } columns={ columns } />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    getalllocations: state.reloadLocationReducer.getalllocations,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getAllReloadLOcations: () => {
      dispatch(getAllReloadLOcations());
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(reloadLocations);