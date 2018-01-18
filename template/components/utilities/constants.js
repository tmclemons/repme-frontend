const repMeConstants = () => {
  return {
    ballotCopy: {
      headerTagLine: `by the people 2.0`,
      formNotice: `**We will not use any of your information for any 3rd
          Party. Nor will we send you emails unless you opt-in to receive 
          them**`,
      emailInputSenate: `To receive results including final Senate Floor Votes`,
      emailInputHouse: `To receive results including final House Votes`,
      zipCodeInputSenate: `This will allow us to include your private ballot along with your constituents that we will provide your Senators`,
      zipCodeInputHouse: `This will allow us to include your private ballot along with your constituents that we will provide your Representative`,
      subscribeToHotBill: `To receive other Hot 
          Congressional Bill Ballots and track their results`,
      subscribeToOtherLegislationInfo: `To receive information 
          from your Legislators about Ballots and Voting results`,
      subscribeToHotBillTitle: `Opt-In`,
      subscribeToOtherLegislationInfoTitle: `Legislator Opt-In`,
      validationPartOne: `Are you sure you do not want to enter your`,
      validationPartTwo: `it will help connect you with fellow constituents and communicate to your elected officials.`,
      validationTitle: `Ready to submit?`,
    //deprecated
    //   preSubmitInfo: (billData) => {
    //       return `This is your private Ballot for 
    //       (Your Ballot No. H.R. ${billData.number}-${billData.hash})` },
      sliderHint: `Slide to Cast`,
      submissionCTA: `Submit my VOTE`
    },
    colorStops: [
        {
            prop: 'stop-0',
            hex: '#f14724'
        },
        {
            prop: 'stop-1',
            hex: '#f25527'
        },
        {
            prop: 'stop-2',
            hex: '#f36329'
        },
        {
            prop: 'stop-3',
            hex: '#f5712c'
        },
        {
            prop: 'stop-4',
            hex: '#f67f2e'
        },
        {
            prop: 'stop-5',
            hex: '#f78d31'
        },
        {
            prop: 'stop-6',
            hex: '#f89b34'
        },
        {
            prop: 'stop-7',
            hex: '#f9a936'
        },
        {
            prop: 'stop-8',
            hex: '#fbb739'
        },
        {
            prop: 'stop-9',
            hex: '#fcc53b'
        },
        {
            prop: 'stop-10',
            hex: '#868686'
        },
        {
            prop: 'stop-11',
            hex: '#f0d23f'
        },
        {
            prop: 'stop-12',
            hex: '#e2d040'
        },
        {
            prop: 'stop-13',
            hex: '#d5cf41'
        },
        {
            prop: 'stop-14',
            hex: '#c7cd42'
        },
        {
            prop: 'stop-15',
            hex: '#bacc43'
        },
        {
            prop: 'stop-16',
            hex: '#acca43'
        },
        {
            prop: 'stop-17',
            hex: '#9fc944'
        },
        {
            prop: 'stop-18',
            hex: '#91c745'
        },
        {
            prop: 'stop-19',
            hex: '#84c646'
        },
        {
            prop: 'stop-20',
            hex: '#76c447'
        },
    ],
    sampleData: {
        "response_code": 200,
        "results": {
            "ballot_number": null,
            "bill": {
                "bill_created_date": null,
                "bill_modified_date": null,
                "bill_result": "",
                "chamber": "House",
                "closing_date": "2018-01-05T04:03:49",
                "created_on": "2018-01-05T04:03:49",
                "data": {
                    "50": 8,
                    "0-4": 9,
                    "10-14": 0,
                    "15-19": 0,
                    "20-24": 2,
                    "25-29": 3,
                    "30-34": 0,
                    "35-39": 0,
                    "40-44": 0,
                    "45-49": 0,
                    "5-9": 0,
                    "51-55": 5,
                    "56-60": 40,
                    "61-65": 9,
                    "66-70": 8,
                    "71-75": 2,
                    "76-80": 1,
                    "81-85": 1,
                    "86-90": 0,
                    "91-95": 0,
                    "96-100": 0
                },
                "description": "<p>(This measure has not been amended since it was introduced. The summary of that version is repeated here.)</p> <p>Authorizes the Speaker of the House and the Majority Leader of the Senate, or their respective designees, to notify the Members of the House and the Senate to assemble at a place outside the District of Columbia whenever, in their opinion, the public interest shall warrant it.</p>",
                "hash_id": "9f5e2b0e-8e46-4f66-9dfc-dcf421",
                "id": 7783,
                "image": "",
                "introduced_date": null,
                "is_default": null,
                "number": "hconres12-115",
                "rollcall_id": 6,
                "sponsor_id": "B001293",
                "status": null,
                "title": "Supporting the designation of the week of September 11 to September 17 as \"Patriot Week\".",
                "updated_on": "2018-01-05T04:03:49"
            },
            "bill_id": 7783,
            "created_on": "2018-01-15T01:11:15.734359",
            "email": "tmclemons87@gmail.com",
            "hash_id": "0c10890f-cf17-418d-9309-8951fe",
            "id": 111,
            "opt_in": 1,
            "opt_in_two": 0,
            "org": {
                "image": "https://static.wixstatic.com/media/ce7760_aa512d49a4804c2c953b01b48442740a~mv2.jpg/v1/fill/w_668,h_82,al_c,q_80,usm_0.66_1.00_0.01/ce7760_aa512d49a4804c2c953b01b48442740a~mv2.webp",
                "name": "Represent Me",
                "slug": "repme"
            },
            "state_code": null,
            "timestamp": null,
            "updated_on": "2018-01-15T01:11:15.734364",
            "user": {
                "address": null,
                "address_cont": null,
                "admin": false,
                "api_key": null,
                "city": null,
                "created_on": "2018-01-11T19:05:11.666831",
                "email": "tmclemons87@gmail.com",
                "first_name": null,
                "hash_id": "5df03c25-9741-4d8a-a82b-51fdd3",
                "id": 22,
                "images": null,
                "last_login": "2018-01-11T19:05:11.668268",
                "last_name": null,
                "opt_in": 1,
                "opt_in_two": 0,
                "password": null,
                "password_reset_token": null,
                "phone": null,
                "profile_image": null,
                "registration_token": null,
                "state": null,
                "super_admin": false,
                "timezone": "US/Eastern",
                "updated_on": "2018-01-11T19:05:11.666850",
                "user_type": null,
                "zip_code": "48331"
            },
            "user_id": 22,
            "vote": 60,
            "zip_code": "48331"
        },
        "success": true
    }
  }
}

export default repMeConstants();