/**
 * Visualize the results of an API call to the FDA.
 */
component.visualization = function() {
  component.apply(this, arguments);
};
assessment.extend(component.visualization, component);

/**
 * Decorate.
 *
 * @param {HTMLDivElement} parent
 */
component.visualization.prototype.decorate = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);

  // Show basic loading text until the API call to the FDA completes.
  var loading = document.createElement('div');
  
  container.appendChild(loading);

  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?count=patient.drug.activesubstance.activesubstancename.exact&limit=1000',
    function(data) {
      self.data = data;
      self.decorate_data(container);
    }
  );
};



component.visualization.prototype.getPatientAge = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);


  var loading = document.createElement('div');
  
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?search=patient.drug.activesubstance.activesubstancename.exact='+ drug+ '&count=patient.patientonsetage',
    function(data) {
      self.data = data;
      self.getPatient_Age(container);
    }
  );

};

component.visualization.prototype.getInfo = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);


  var loading = document.createElement('div');
  
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?count=patient.drug.activesubstance.activesubstancename.exact&limit=1000',
    function(data) {
      self.data = data;
      self.getInfo_data(container);
    }
  );

};

component.visualization.prototype.getMF = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);


  var loading = document.createElement('div');
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?search=patient.drug.activesubstance.activesubstancename.exact='+ drug + '&count=patient.patientsex',
    function(data) {
      self.data = data;
      self.get_MF(container);
    }
  );

};

component.visualization.prototype.getResult = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);


  var loading = document.createElement('div');
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?search=patient.drug.activesubstance.activesubstancename.exact='+ drug + '&count=patient.reaction.reactionoutcome',
    function(data) {
      self.data = data;
      self.get_Result(container);
    }
  );

};

component.visualization.prototype.getAction = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);
  var loading = document.createElement('div');
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?search=patient.drug.activesubstance.activesubstancename.exact='+ drug + '&count=patient.drug.actiondrug',
    function(data) {
      self.data = data;
      self.get_Action(container);
    }
  );

};

component.visualization.prototype.getDate = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);
  var loading = document.createElement('div');
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?search=patient.drug.activesubstance.activesubstancename.exact='+ drug + '&count=receiptdate',
    function(data) {
      self.data = data;
      self.get_Date(container);
    }
  );

};

component.visualization.prototype.getForm = function(parent) {
  var self = this;
  var container = document.createElement('div');
  parent.appendChild(container);
  var loading = document.createElement('div');
  container.appendChild(loading);

  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug');
  assessment.fda_api(
    'https://api.fda.gov/drug/event.json?search=patient.drug.activesubstance.activesubstancename:'+ drug +'&count=patient.drug.drugdosageform.exact',
    function(data) {
      self.data = data;
      self.get_Form(container);
    }
  );

};

component.visualization.prototype.decorate_data = function(parent) {
 arr =[]

  for (x in this.data) {
    str = this.data[x]['term'].trim()
    if (str.length > 50) {
      continue;
    }

    str = str.replace('\\', ' ')

    arr.push( str.charAt(0) + str.substring(1).toLowerCase())
  } 
  autocomplete(document.getElementById("myInput"), arr)
};

component.visualization.prototype.getInfo_data = function(parent) {
 arr =[]

  for (x in this.data) {
    arr[this.data[x]['term']] = this.data[x]['count']
  } 
  
  new URL(location.href).searchParams.get('drug')
  const params = new URL(location.href).searchParams;
  const drug = params.get('drug').toUpperCase();
  document.getElementById('nameD').innerHTML = "<legend>There are in total "+arr[drug]+ " FDA reports for " +drug+"</legend>";
   
};

component.visualization.prototype.getPatient_Age = function(parent) {
 arr = Array.apply(null, Array(120)).map(Number.prototype.valueOf,0);
  for (x in this.data) {
    
    if(this.data[x]['term'] >= 120) continue;
    arr[this.data[x]['term']] = this.data[x]['count']
  } 
  arr.unshift("People")

  histogram("#chart_Age", arr)
};

component.visualization.prototype.get_MF = function(parent) {
 arr = []
  for (x in this.data) {
    
    temp = ''
    if(this.data[x]['term'] == 0) {
      temp = "Other"
    }
    else if(this.data[x]['term'] == 1) {
      temp = "Male"
    }
    else {
      temp = 'Women'
    }
    arr.push([temp, this.data[x]['count']])
  } 
  
  pie("#chart_MF", arr)
};

component.visualization.prototype.get_Result = function(parent) {
 arr = []
  for (x in this.data) {
    temp = ''
    if(this.data[x]['term'] == 1) {
      temp = " Recovered/resolved"
    }
    else if(this.data[x]['term'] == 2) {
      temp = "Recovering/resolving"
    }
    else if(this.data[x]['term'] == 3) {
      temp = "Not recovered/not resolved"
    }
    else if(this.data[x]['term'] == 4) {
      temp = "Recovered/resolved with health issues"
    }
    else if(this.data[x]['term'] == 5) {
      temp = "Fatal"
    }
    else { 
      temp = 'Undocumented'
    }
    arr.push([temp, this.data[x]['count']])
  } 
  pie("#chart_result", arr)
};

component.visualization.prototype.get_Action= function(parent) {
 arr = []
  for (x in this.data) {
    temp = ''
    if(this.data[x]['term'] == 1) {
      temp = "Drug withdrawn"
    }
    else if(this.data[x]['term'] == 2) {
      temp = "Dose reduced"
    }
    else if(this.data[x]['term'] == 3) {
      temp = "Dose increased"
    }
    else if(this.data[x]['term'] == 4) {
      temp = "Dose not changed"
    }
    else if(this.data[x]['term'] == 5) {
      temp = "Unknown"
    }
    else { 
      temp = 'Not applicable'
    }
    arr.push([temp, this.data[x]['count']])
  } 
  pie("#chart_action", arr)
};

component.visualization.prototype.get_Date= function(parent) {
 arr = []
 
  for (x in this.data) {

    temp = this.data[x]['time'].substring(0,4);
    if (temp > 2019 || temp < 2000) {
      continue;
    }
    if(typeof arr[temp] === 'undefined') {
      arr[temp] = 0
    }

    arr[temp] += this.data[x]['count']
  }
  keys = Object.keys(arr)
  res = []
  i = 0
  for(x in arr) {
    res[i] = arr[x]
    i += 1
  }
  res.unshift("People")
  keys.unshift("Year")
  
  spline("#chart_date", res, keys)
};


component.visualization.prototype.get_Form= function(parent) {
 arr = []
 i = 0
  for (x in this.data) {
    if (i == 5) {
      break;
    }
    i++;
    str = this.data[x]['term'];
    
    arr.push([str.charAt(0) + str.substring(1).toLowerCase(), this.data[x]['count']]);
  } 
  
  pie("#chart_form", arr);
};