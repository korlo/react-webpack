var Todobox = React.createClass({
	getInitiaState:function(){
		return{
				data:[ ", "task":"打豆豆", "complete": "true"},
			]
		}
	},
	
	handleTaskDelete:function(taskId){
		var data = this.state.data;
		data = data.filter(function(task){
			return task.id !==taskId;
		});
		this.setState({data});
		
	},
	
	handToggleComplete:function(taskId){
		var data = this.state.data ;
		for(var i in data){
			if(data[i].id === taskId){
				data[i].complete ==
				
			}
		}
	}
	
	
	
})