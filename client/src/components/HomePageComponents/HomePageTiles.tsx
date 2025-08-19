import React from "react";

function HomePageTiles({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl">
      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center  justify-center h-full">
          <div className="text-gray-600 font-medium">Actively monitoring</div>
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            {data["mcaUserCount"] + data["mscUserCount"]}
          </div>
          <div className="text-gray-600">Students</div>
          <div className="flex gap-3 flex-wrap justify-center mt-4">
            <div className="bg-orange-50 px-3 py-1 rounded-full">
              <span className="font-semibold text-AC_Orange">
                {data["mcaUserCount"]}
              </span>
              <span className="text-gray-600 ml-1">MCA</span>
            </div>
            <div className="bg-orange-50 px-3 py-1 rounded-full">
              <span className="font-semibold text-AC_Orange">
                {data["mscUserCount"]}
              </span>
              <span className="text-gray-600 ml-1">MSC</span>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="col-span-2 row-span-3 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6*/}
      {/*    transition-all duration-300 hover:shadow-xl group border border-gray-100">*/}
      {/*    <div className="flex justify-evenly mb-6">*/}
      {/*        <div className="flex flex-col items-center">*/}
      {/*            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600*/}
      {/*                bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600*/}
      {/*                transition-all duration-300">*/}
      {/*                {data['dsaToday']}*/}
      {/*            </div>*/}
      {/*            <div className="text-gray-600 font-medium">DSA Today</div>*/}
      {/*        </div>*/}
      {/*        <div className="flex flex-col items-center">*/}
      {/*            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600*/}
      {/*                bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600*/}
      {/*                transition-all duration-300">*/}
      {/*                {data['dsaPast14Days']}*/}
      {/*            </div>*/}
      {/*            <div className="text-gray-600 font-medium">DSA Past 14 Days</div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div><Days14LineGraph data={data['past14DaysData']}/></div>*/}
      {/*</div>*/}

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            73
          </div>
          <div className="text-gray-600 font-medium">PYQ with solutions</div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex gap-4 items-center justify-center h-full">
          <div className="flex flex-col items-center ">
            <div
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
            >
              10+
            </div>
            <div className="text-gray-600 font-medium">Coding Contest</div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
            >
              3
            </div>
            <div className="text-gray-600 font-medium">Events Organised</div>
          </div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center  justify-center h-full">
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            147
          </div>
          <div className="text-gray-600 font-medium">Academic Resources</div>
          <div className="mt-2 text-sm text-gray-500">Notes & Materials</div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center  justify-center h-full">
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            786
          </div>
          <div className="text-gray-600 font-medium">Network Size</div>
          <div className="mt-2 text-sm text-gray-500">
            Connections eager to help
          </div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center  justify-center h-full">
          <div className="text-gray-600 font-medium">People placed in</div>
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            36+
          </div>
          <div className="text-sm text-gray-500">Companies to guide you</div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center  justify-center h-full">
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            {data["leadCount"]}
          </div>
          <div className="text-gray-600 font-medium">AC Leads</div>
          <div className="mt-2 text-sm text-gray-500">
            Guiding the community
          </div>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-gray-100"
      >
        <div className="flex flex-col items-center  justify-center h-full">
          <div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600
                        bg-clip-text text-transparent group-hover:from-AC_Orange group-hover:to-orange-600
                        transition-all duration-300"
          >
            11
          </div>
          <div className="text-gray-600 font-medium mb-4">OPC Conducted</div>
          <div className="flex gap-3 flex-wrap justify-center">
            <div className="bg-orange-50 px-3 py-1 rounded-full">
              <span className="font-semibold text-AC_Orange">2024</span>
              <span className="text-gray-600 ml-1">(5)</span>
            </div>
            <div className="bg-orange-50 px-3 py-1 rounded-full">
              <span className="font-semibold text-AC_Orange">2025</span>
              <span className="text-gray-600 ml-1">(7)</span>
            </div>
          </div>
        </div>
      </div>

      {/*can also add number of projects deployed*/}
    </div>
  );
}

export default HomePageTiles;
