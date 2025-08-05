import React, {useRef, useEffect} from "react";
import * as d3 from "d3";

const LineChart = ({data}) => {

    console.log(data)

    const containerRef = useRef();

    useEffect(() => {
        const margin = {top: 20, right: 30, bottom: 40, left: 50};
        const width = 700 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Parse date and format
        const parseDate = d3.timeParse("%Y-%m-%d");
        const formatDate = d3.timeFormat("%b %d");

        // Convert and sort data
        const formattedData = data
            .map(d => ({
                date: parseDate(d.date),
                value: d.uniqueQuestionsSolved,
            }))
            .sort((a, b) => a.date - b.date);

        // Get full date range
        const dateExtent = d3.extent(formattedData, d => d.date);
        const allDates = d3.timeDay.range(dateExtent[0], d3.timeDay.offset(dateExtent[1], 1));

        // Map available data for fast lookup
        const dataMap = new Map(formattedData.map(d => [d.date.toDateString(), d]));

        // Clear previous render
        d3.select(containerRef.current).select("svg").remove();

        // Create SVG
        const svg = d3
            .select(containerRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const x = d3.scaleTime()
            .domain([allDates[0], allDates[allDates.length - 1]])
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(formattedData, d => d.value)])
            .nice()
            .range([height, 0]);

        // Axes
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(
                d3.axisBottom(x)
                    .tickValues(allDates)
                    .tickFormat(formatDate)
            )
            .selectAll("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em");

        svg.append("g").call(d3.axisLeft(y));

        // Line generator expects just Dates, not objects
        const line = d3.line<Date>()
            .defined(date => dataMap.has(date.toDateString()))
            .x(date => x(date))
            .y(date => y(dataMap.get(date.toDateString())!.value)); // use ! because we checked existence in .has()

        // Apply to line
        svg.append("path")
            .datum(allDates) // array of Date objects
            .attr("fill", "none")
            .attr("stroke", "#3b82f6")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("padding", "6px 10px")
            .style("border", "1px solid #ccc")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("font-size", "14px")
            .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)");

        // Dots
        svg.selectAll(".dot")
            .data(formattedData)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.value))
            .attr("r", 4)
            .attr("fill", "#1d4ed8")
            .on("mouseover", (event, d) => {
                tooltip
                    .html(`<strong>${formatDate(d.date)}</strong><br/>Solved: ${d.value}`)
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px")
                    .transition()
                    .duration(200)
                    .style("opacity", 1);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(300).style("opacity", 0);
            });

        // Cleanup tooltip on unmount
        return () => {
            tooltip.remove();
        };
    }, [data]);

    return <div ref={containerRef} style={{position: "relative"}}/>;
};

export default LineChart;
