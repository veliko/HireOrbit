import { actions } from '../constants';

var dataset = [
				{
        	location: "San Francisco, ca",
          totalResults: 7323,
					query : "software engineer"
       	},
        {
        	location: "Los Angeles, ca",
        	totalResults: 1630,
					query: "web developer"
        },
        {
        	location: "San Jose, ca",
        	totalResults: 119,
					query: "massage therapist"
        },
        {
        	location: "Sunnyvale, ca",
        	totalResults: 9660,
					query: "software engineer"
        },
        {
        	location: "New York, ny",
        	totalResults: 1027,
					query: "front End Web Developer"
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
