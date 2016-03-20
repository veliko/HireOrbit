import { actions } from '../constants';
import update from 'react-addons-update';

export const INITIAL_STATE = [
  {
    card_id: '837bbee9c53d1557',
    rank: 1000,
    status: 'interested',
    job_data: {
      jobtitle: 'Software Engineer',
      company: 'DHG',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      formattedLocation: 'San Francisco, CA',
      source: 'DHG',
      date: '2016-03-08 07:03:01',
      snippet: '6+ years of experience as a <b>software</b> <b>engineer</b>. The <b>Software</b> <b>Engineer</b> is going to be responsible for serving as a resource on a large project team....',
      url: 'http://www.indeed.com/viewjob?jk=837bbee9c53d1557&qd=gCWAfkuMTwh29ArBRLZSnQfxBrY4beA8U3x1SufrAoU_E_cshm15S-_EMD-8iR-y-h5Mt_o39rR5h4FnUk6obe1cfzCEd5LVzWRQY9_DOUIazh3D_TLvwUcTXszHRuXz&indpubnum=788696528762292&atk=1adu1t12lav6kca3',
      onmousedown: 'indeed_clk(this, \'7943\');',
      jobkey: '837bbee9c53d1557',
      sponsored: false,
      expired: false,
      indeedApply: false,
      formattedLocationFull: 'San Francisco, CA',
      formattedRelativeTime: '6 days ago',
      noUniqueUrl: false,
      latitude: undefined,
      longitude: undefined
    }
  },
  {
    card_id: 'a19f92bc75717d65',
    rank: 2000,
    status: 'interested',
    job_data: {
      jobtitle: 'Software Engineer',
      company: 'Autodesk',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      formattedLocation: 'San Francisco, CA',
      source: 'Autodesk',
      date: '2016-03-04 01:03:19',
      snippet: '1+ years of experience with web application technologies such as Java, Java Script, Angular, Node js, JQuery, HTML and CSS....',
      url: 'http://www.indeed.com/viewjob?jk=a19f92bc75717d65&qd=gCWAfkuMTwh29ArBRLZSnQfxBrY4beA8U3x1SufrAoU_E_cshm15S-_EMD-8iR-y-h5Mt_o39rR5h4FnUk6obe1cfzCEd5LVzWRQY9_DOUIazh3D_TLvwUcTXszHRuXz&indpubnum=788696528762292&atk=1adu1t12lav6kca3',
      onmousedown: 'indeed_clk(this, \'7943\');',
      jobkey: 'a19f92bc75717d65',
      sponsored: false,
      expired: false,
      indeedApply: false,
      formattedLocationFull: 'San Francisco, CA',
      formattedRelativeTime: '11 days ago',
      noUniqueUrl: false,
      latitude: undefined,
      longitude: undefined
    }
  },
  {
    card_id: 'b7d99606d4896bb3',
    rank: 3000,
    status: 'interested',
    job_data: {
      jobtitle: 'Software Engineer',
      company: 'hc1.com',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      formattedLocation: 'San Francisco, CA',
      source: 'hc1.com',
      date: '2016-03-11 05:03:49',
      snippet: '<b>Software</b> <b>Engineer</b>, <b>Software</b> <b>Engineer</b> I, <b>Software</b> <b>Engineer</b> II, <b>Software</b> Developer, Java Developer, Cloud, SaaS, AWS....',
      url: 'http://www.indeed.com/viewjob?jk=b7d99606d4896bb3&qd=gCWAfkuMTwh29ArBRLZSnQfxBrY4beA8U3x1SufrAoU_E_cshm15S-_EMD-8iR-y-h5Mt_o39rR5h4FnUk6obe1cfzCEd5LVzWRQY9_DOUIazh3D_TLvwUcTXszHRuXz&indpubnum=788696528762292&atk=1adu1t12lav6kca3',
      onmousedown: 'indeed_clk(this, \'7943\');',
      jobkey: 'b7d99606d4896bb3',
      sponsored: false,
      expired: false,
      indeedApply: false,
      formattedLocationFull: 'San Francisco, CA',
      formattedRelativeTime: '4 days ago',
      noUniqueUrl: false,
      latitude: undefined,
      longitude: undefined
    }
  },
  {
    card_id: '67706ccd851e9664',
    rank: 4000,
    status: 'interested',
    job_data: {
      jobtitle: 'Games Publishing Software Engineer (Cardboard and Google VR)',
      company: 'Google',
      city: 'Mountain View',
      state: 'CA',
      country: 'US',
      formattedLocation: 'Mountain View, CA',
      source: 'Google',
      date: '2016-02-19 10:02:25',
      snippet: 'The Google VR team is a fast moving group of <b>engineers</b>, designers, and research scientists tasked with building the foundations for great VR, developing VR apps...',
      url: 'http://www.indeed.com/viewjob?jk=67706ccd851e9664&qd=gCWAfkuMTwh29ArBRLZSnQfxBrY4beA8U3x1SufrAoU_E_cshm15S-_EMD-8iR-y-h5Mt_o39rR5h4FnUk6obe1cfzCEd5LVzWRQY9_DOUIazh3D_TLvwUcTXszHRuXz&indpubnum=788696528762292&atk=1adu1t12lav6kca3',
      onmousedown: 'indeed_clk(this, \'7943\');',
      jobkey: '67706ccd851e9664',
      sponsored: false,
      expired: false,
      indeedApply: false,
      formattedLocationFull: 'Mountain View, CA',
      formattedRelativeTime: '24 days ago',
      noUniqueUrl: false,
      latitude: undefined,
      longitude: undefined
    }
  },
  {
    card_id: '4c1cdd949b5a7b99',
    rank: 5000,
    status: 'interested',
    job_data: {
      jobtitle: 'Software Engineer',
      company: 'Renaissance Learning, Inc.',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      formattedLocation: 'San Francisco, CA',
      source: 'Renaissance Learning, Inc.',
      date: '2016-03-12 06:03:22',
      snippet: 'C#, JavaScript, AngularJS, Flex, HTML, CSS, MS SQL Server, TSQL, Java, C, C++, Scrum, <b>Engineer</b>, Developer....',
      url: 'http://www.indeed.com/viewjob?jk=4c1cdd949b5a7b99&qd=gCWAfkuMTwh29ArBRLZSnQfxBrY4beA8U3x1SufrAoU_E_cshm15S-_EMD-8iR-y-h5Mt_o39rR5h4FnUk6obe1cfzCEd5LVzWRQY9_DOUIazh3D_TLvwUcTXszHRuXz&indpubnum=788696528762292&atk=1adu1t12lav6kca3',
      onmousedown: 'indeed_clk(this, \'7943\');',
      jobkey: '4c1cdd949b5a7b99',
      sponsored: false,
      expired: false,
      indeedApply: false,
      formattedLocationFull: 'San Francisco, CA 94103',
      formattedRelativeTime: '3 days ago',
      noUniqueUrl: false,
      latitude: undefined,
      longitude: undefined
    }
  }
];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case actions.ADD_CARDS_TO_KANBAN: 
      let duplicatesRemoved = action.payload.cards.filter((card) => {
        var cardExists = state.find((existingCard) => card.card_id === existingCard.card_id);
        return !cardExists;
      });
      return update(state, {
        $push: [...duplicatesRemoved]
      });
    
    case actions.UPDATE_CARD_STATUS:
      let cardIndex = state.findIndex((card) => card.card_id === action.payload.card_id);
      return update(state, {
        [cardIndex]: {
            status: {$set: action.payload.status}
          }
      });

    case actions.UPDATE_CARD_POSITION: 
      let hoverCardIndex = state.findIndex((card) => card.card_id === action.payload.hoverCardId);
      let cardBelowIndex = state.findIndex((card) => card.card_id === action.payload.cardBelowId);
      let hoverCard = state[hoverCardIndex];
      return update(state, {
        $splice: [
          [hoverCardIndex, 1],
          [cardBelowIndex, 0, hoverCard]
        ]
      });
    
    default: return state;
  }
}
