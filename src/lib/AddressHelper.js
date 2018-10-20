const AddressHelper = {
  quadrants: {
    southwest: 'SW',
    northwest: 'NW',
    southeast: 'SE',
    northeast: 'NE',
  },
 
  roadname: {
    avenue:'AV',
    ave:'AV',
    alley:'AL',
    bay:'BA',
    boulevard:'BV',
    cape:'CA',
    center:'CE',
    circle:'CI',
    close:'CL',
    common:'CM',
    court:'CO',
    cove:'CV',
    crescent:'CR',
    drive:'DR',
    gardens:'GD',
    gate:'GA',
    green:'GR',
    grove:'GV',
    heath:'HE',
    heights:'HT',
    highway:'HI',
    hill:'HL',
    island:'IS',
    landing:'LD',
    lane:'LN',
    link:'LI',
    manor:'MR',
    mews:'MW',
    mount:'MT',
    parade:'PR',
    park:'PA',
    parkway:'PY',
    passage:'PS',
    path:'PH',
    place:'PL',
    plaza:'PZ',
    point:'PT',
    rise:'RS',
    road:'RD',
    row:'RO',
    square:'SQ',
    street:'ST',
    terrace:'TC',
    trail:'TR',
    view:'VW',
    villas:'VI',
    walk:'WK',
    walkway:'WK',
    way:'WY'
  },

  convertGoogleAddress: function(address){
    let resultant = address;
 
    resultant = (resultant.split(',')[0]).split(' ');
 
    // working on the elements
    let quadrant = resultant.pop().toLowerCase();
    let road = resultant.pop().toLowerCase();
 
    quadrant = ( this.quadrants[quadrant] ? this.quadrants[quadrant] : quadrant );
    road = ( this.roadname[road] ? this.roadname[road] : road );
 
    // putting the resultant back together
    resultant.push(road);
    resultant.push(quadrant);
    resultant = resultant.join(' ').toUpperCase();

    return resultant
  }

}

export default AddressHelper;