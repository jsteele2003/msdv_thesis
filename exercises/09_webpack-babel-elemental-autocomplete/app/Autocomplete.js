import React, {Component} from 'react';
import ReactAutocomplete  from 'react-autocomplete';
import museums from './museums.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormField, FormInput, Checkbox } from 'elemental';

// Autocomplete Institution
class Autocomplete extends Component{
	componentWillMount() {
    console.log(museums);
		this.setState({
		  value: '',
		  search: '',
		  searchInput: false,
		});
	}
	submit(id) {
    alert(this.state.value);
	}
	render() {
  	var partial;
		 partial =
			<div>
		      <ReactAutocomplete
		        items={museums}
  		        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
		        getItemValue={item => item.name}
		        renderItem={(item, highlighted) =>
		          <div
		            key={item.id}
		            style={{
		            	backgroundColor: highlighted ? '#D3D3D3' : 'transparent',
		            	fontSize: '150%'
		            }}
		          >
		            {item.name}
		          </div>
		        }
		        value={this.state.value}
		        onChange={e => this.setState({ value: e.target.value })}
		        onSelect={(value, search) => this.setState({ value, search })}
		      />
  			  <Button type='link-text' onClick={item => this.submit()}><span className="glyphicon glyphicon-clear" aria-hidden="true"></span> FIND</Button>
		    </div>

    return (
    	<li>
    		{partial}
    	</li>
    )
  }
}

export default Autocomplete
