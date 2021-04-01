function ReadData(sample) {
    d3.json("samples.json").then((data)=>{
        var metaData = data.metdata;

        var values = metaData.filter(sampleObj => sampleObj.id == sample);
        var value = values[0];
        // console.log(value)

        var panel = d3.select("#sample-metadata");

        panel = html("");

        Object.entries(value).forEach(([key, value]) => {
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
  