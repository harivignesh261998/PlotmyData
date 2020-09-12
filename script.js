var val
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);
    
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
  

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
 
          chooseData=()=>{
          
    val=document.getElementById('dataset').value;
    d3.csv('./data/fifa-world-cup.csv',function(data){
        d3.select('bar').remove()
        
        // console.log(val)
        
        // console.log(data)
        data=data.reverse()
        console.log(data)
        data.forEach(res=>{
            res.YEAR=+res.YEAR
           res[val]=+res[val]
    
        })
        // console.log(data)
        x.domain(data.map(function(res) { return res.YEAR; }));
        y.domain([0, d3.max(data, function(res) { return res[val]; })]);
        
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
    
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      
    
    svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(res) { return x(res.YEAR); })
      .attr("width", x.rangeBand())
      .attr("y", function(res) { return y(res[val]); })
      .attr("height", function(res) { return height - y(res[val]); });
    
     
      
    });
    

}
   

  
  



