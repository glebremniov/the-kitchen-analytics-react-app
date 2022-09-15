import { useMemo } from "react";
import { useRoutes as useReactRoutes } from "react-router-dom";

import { useDataFilters, useTableFilters, useStatisticsFilters } from "./";
import { buildDropdownOptions } from "../utils/ui/dropdown";

import { Navigate } from "react-router-dom";
import {
    DailyDataView,
    MonthlyDataView,
    AllDataView
} from "../components/shared/View";

import { DailyTableView, MonthlyTableView, AllTimeTableView } from "../pages/Tables";
import { DailyStatisticsView, MonthlyStatisticsView, AllTimeStatisticsView } from "../pages/Statistics";
import SettingsView from "../pages/Settings/SettingsView";
import SubmitDataView from "../pages/SubmitData/SubmitDataView";
import NoContentView from "../pages/NoContentView";

const useRoutes = (data, refreshData, groupedData, workedDays) => {

    const dataFilters = useDataFilters(data, groupedData);

    const {
        getAllTableData,
        getTableDataByMonth,
        getTableDataByDay
    } = useTableFilters(dataFilters);

    const {
        getAllStatisticsData,
        getStatisticsDataByMonth,
        getStaisticsDataByDay
    } = useStatisticsFilters(dataFilters);

    const daySelectOptions = useMemo(() => buildDropdownOptions(workedDays), [workedDays]);

    const routes = useMemo(() => (
        [
            {
                path: "",
                element: <Navigate to="/table/daily" />
            },
            {
                path: "table",
                children: [
                    {
                        path: "daily",
                        element: (
                            <DailyDataView
                                icon="table"
                                options={daySelectOptions}
                                getData={getTableDataByDay}
                                component={DailyTableView}
                            />
                        ),
                    },
                    {
                        path: "montly",
                        element: (
                            <MonthlyDataView
                                icon="table"
                                getData={getTableDataByMonth}
                                component={MonthlyTableView}
                            />
                        )
                    },
                    {
                        path: '',
                        element: (
                            <AllDataView
                                icon="table"
                                getData={getAllTableData}
                                component={AllTimeTableView}
                            />
                        )
                    }
                ],
            },

            {
                path: "statistics",
                children: [
                    {
                        path: "daily",
                        element: (
                            <DailyDataView
                                icon="chart bar"
                                options={daySelectOptions}
                                getData={getStaisticsDataByDay}
                                component={DailyStatisticsView}
                            />
                        )
                    },
                    {
                        path: "montly",
                        element: (
                            <MonthlyDataView
                                icon="chart bar"
                                getData={getStatisticsDataByMonth}
                                component={MonthlyStatisticsView}
                            />
                        )
                    },
                    {
                        path: '',
                        element: (
                            <AllDataView
                                icon="chart bar"
                                getData={getAllStatisticsData}
                                component={AllTimeStatisticsView}
                            />
                        )
                    }
                ],
            },

            {
                path: "settings",
                element: (
                    <SettingsView />
                )
            },

            {
                path: 'submitData',
                element: (
                    <SubmitDataView
                        refreshData={refreshData}
                    />
                )
            },

            {
                path: '*',
                element: <NoContentView />
            }
        ]
    ), [
        daySelectOptions,
        getAllStatisticsData,
        getAllTableData,
        getStaisticsDataByDay,
        getStatisticsDataByMonth,
        getTableDataByDay,
        getTableDataByMonth,
        refreshData
    ])

    return useReactRoutes(routes)
}

export default useRoutes;
