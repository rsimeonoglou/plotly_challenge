function ReadData(sample) {
    d3.json("samples.json").then((data)=>{
        var metaData = data.metdata;

        var results = metaData.filter(sampleObj => sampleObj.id == sample);
        var result = results[0];
        // console.log(value)

        var panel = d3.select("#sample-metadata");

        panel = html("");

        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
          });

    })
}

function BubbleChart(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var values = samples.filter(sampleObj => sampleObj.id == sample);
        var value = values[0];
    
        var id = value.otu_ids;
        var labels = value.otu_labels;
        var sample_values = value.sample_values;
    //   console.log(id)
    //   console.log(labels)
    //   console.log(sample_values)

        var layer = {
            title: "Belly Button Biodiversity",
            
            hovermode: "closest",
            xaxis: { title: "OTU ID" }
            
        };
        var data_bubble = [
            {
            x: id,
            y: sample_values,
            text: labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: id
                
            }
            }
        ];
    
        Plotly.newPlot("bubble", data_bubble, layer);
        var yticks = id.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function init() {
  var dropwdown = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    var names = data.names;

    names.forEach((sample) => {
        dropwdown
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = names[0];
    BubbleChart(firstSample);
    ReadData(firstSample);
  });
}

function optionChanged(newSample) {

  BubbleChart(newSample);
  ReadData(newSample);
}

init();

  