import { actions } from '../constants';

var dataset = [
				{
        	city: "San Francisco",
        	state: "CA",
          libraries: ["React", "Angular", "Backbone"],
          data: [391, 540, 450]
       	},
        {
	        city: "Los Angeles",
        	state: "CA",
          libraries: ["React", "Angular", "Backbone"],
          data: [106, 266, 127]
        },
        {
        	city: "San Jose",
        	state: "CA",
          libraries: ["React", "Angular", "Backbone"],
          data: [256, 677, 399]
        },
        {
        	city: "Sunnyvale",
        	state: "CA",
          libraries: ["React", "Angular", "Backbone"],
          data: [323, 677, 399]
        },
        {
        	city: "New York",
        	state: "NY",
          libraries: ["React", "Angular", "Backbone"],
          data: [308, 731, 436]
        },
        {
        	city: "Austin",
        	state: "TX",
          libraries: ["React", "Angular", "Backbone"],
          data: [83, 151, 116]
        },
				{
        	city: "Dallas",
        	state: "TX",
          libraries: ["React", "Angular", "Backbone"],
          data: [70, 264, 133]
        },
				{
        	city: "Portland",
        	state: "OR",
          libraries: ["React", "Angular", "Backbone"],
          data: [48, 94, 51]
        },
				{
        	city: "Chicago",
        	state: "IL",
          libraries: ["React", "Angular", "Backbone"],
          data: [151, 404, 215]
        }
		];

export default function(state = dataset, action) {
  console.log('actionaction from reducer Data', action.type)
  switch (action.type) {
    case actions.FETCH_DATA_VIS:
    console.log('INSIDE ACTION', action.payload.searches);
      return dataset
    default: return state;
  }
}
