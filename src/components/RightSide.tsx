import React from "react";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaNetworkWired } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
  PieChart,
  Pie,
} from "recharts";
import { axios_auth } from "../config/config";
import { Link } from "react-router-dom";
import { FreelancerStore } from "../helper/FreelancerStore";

type Counting = {
  jobProviders: number;
  jobSeekers: number;
  jobs: number;
  gigs: number;
};


function RightSide() {
  const [counting, setCounting] = React.useState<Counting>({
    jobProviders: 0,
    jobSeekers: 0,
    jobs: 0,
    gigs: 0,
  });

  const [data, setData] = React.useState<any[]>([]);

  const datas = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const CountAllHandler = async () => {
    try {
      const response = await axios_auth.get(`/admin/countAll`);
      if (response.status === 200) {
        setCounting({
          jobProviders: response.data.jobProviders,
          jobSeekers: response.data.freelancers,
          jobs: response.data.job,
          gigs: response.data.gigs,
        });
      }
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  };

  const getGraphHandler = async () => {
    try {
      const response = await (FreelancerStore.getState() as any).getGrowth();
      setData(response.userGrowthData);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  };

  React.useEffect(() => {
    CountAllHandler();
    getGraphHandler();
  }, []);

  return (
    <React.Fragment>
      <div className="w-[100%] flex flex-col gap-y-4">
        <div className="flex gap-x-3">
          <Link to="/job-providers">
            <div className=" cursor-pointer flex flex-col gap-y-2 py-8 px-14 rounded-md bg-orange items-center justify-center">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Job Providers</span>
                <RiUserSettingsFill color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.jobProviders}
              </span>
            </div>
          </Link>
          <Link to="/job-seekers">
            <div className=" cursor-pointer flex flex-col gap-y-2 py-8 px-14 rounded-md bg-orange items-center justify-center">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Job Seekers</span>
                <PiUsersThreeFill color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.jobSeekers}
              </span>
            </div>
          </Link>
          <div className=" cursor-pointer flex flex-col gap-y-2 w-[14rem] rounded-md bg-orange items-center justify-center">
            <Link to="/jobs">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Jobs</span>
                <FaNetworkWired color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.jobs}
              </span>
            </Link>
          </div>
          <div className=" cursor-pointer flex flex-col gap-y-2 w-[14rem] rounded-md bg-orange items-center justify-center">
            <Link to="/gigs">
              <div className="flex gap-x-2">
                <span className="font-poppins text-white">Gigs</span>
                <GiGraduateCap color="#ffff" size={25} />
              </div>
              <span className="text-white font-poppins text-[2rem]">
                {counting?.gigs}
              </span>
            </Link>
          </div>
        </div>
        <div className="flex gap-x-4 mt-10 mb-10">
          <div>
            
          </div>
          <div className="flex flex-col items-center">
            <span className="font-poppins">User Registered this month</span>
            {/* bar chart  */}
            <BarChart
              width={300}
              height={100}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Label value="User registered this month" position="top" />
              <Bar dataKey="uv" fill="#79AC78" />
            </BarChart>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RightSide;
