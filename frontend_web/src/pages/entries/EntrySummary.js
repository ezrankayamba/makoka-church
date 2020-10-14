
import { useLazyQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { ENTRIES_FILTER_VARS_NO_PAGES } from '../../constants';
import { GET_ENTRIES } from '../../helpers/GraphQL';
import Numbers from '../../helpers/Numbers';

function EntrySummary({ filter, newEntry }) {
    const [getEntries, { loading, data, error, refetch }] = useLazyQuery(GET_ENTRIES, {
        variables: { ...ENTRIES_FILTER_VARS_NO_PAGES, ...filter },
    });
    useEffect(() => {
        const abortCtrl = new AbortController();
        getEntries();

        return function cleanup() {
            abortCtrl.abort();
        };
    }, [filter]);

    useEffect(() => {
        console.log("New Entry: ", newEntry)
        const abortCtrl = new AbortController();
        if (refetch) refetch();

        return function cleanup() {
            abortCtrl.abort();
        };
    }, [newEntry]);

    if (loading || loading) return <p>Loading...</p>;
    if (error || error) return <p>Error :(</p>;

    const revenues = data ? data.entries.filter(r => r.entryType === 0) : []
    const expenses = data ? data.entries.filter(r => r.entryType === 1) : []
    const totalRevenue = revenues.reduce((prev, o) => prev + o.amount, 0)
    const totalExpenses = expenses.reduce((prev, o) => prev + o.amount, 0)
    const balance = totalRevenue - totalExpenses

    return <div className="summary">
        <h5>Summary</h5>
        <div><div>Revenue: <br /><i><small>{revenues.length} record(s)</small></i></div> <span>{Numbers.fmt(totalRevenue)}</span></div>
        <div><div>Expense:<br /><i><small>{expenses.length} record(s)</small></i> </div><span>{Numbers.fmt(totalExpenses)}</span></div>
        <hr />
        <div>Balance: <span>{Numbers.fmt(balance)}</span></div>
    </div>
}

export default EntrySummary;