import React from 'react';
import MaterialTable, {Action, Query} from 'material-table';

import Table from "../components/util/Table";
import {Check, Clear} from "@material-ui/icons";
import Dot from "../components/util/Dot";
import Checkbox from '@mui/material/Checkbox';
import {notificationsColors} from "../model/Notification";
import {apply, deny, getAllNotifications, markRead} from "../api/notifications";
import Notification from "../model/Notification";
import Pageable from "../model/Pageable";


export default function Notifications() {
    const tableRef = React.createRef<MaterialTable<Notification>>();

    const tableColumns = [
        {
            title: 'Новые',
            field: "new",
            filtering: false,
            render: (row: Notification) =>
                <Checkbox sx={{height: '40px', width: '40px'}} icon={<></>} checked={row.isNew} onClick={() => {
                    if (row.isNew) {
                        markRead(row.id).then(r => {
                            row.isNew = false;
                            (tableRef.current as any).onQueryChange();
                        })
                    }
                }} checkedIcon={<Dot color={notificationsColors.get(row.type)}/>}/>
        },
        {
            title: 'Дата',
            field: "date",
            sorting: true,
            filtering: false,
        },
        {
            title: 'Текст',
            field: "text",
            sorting: false,
            filtering: false,
            // cellStyle: {
            //
            // },
        }
    ];

    const tableActions: Action<Notification>[] = [
        {
            icon: () => <Check/>,
            onClick: (event: React.EventHandler<any>, objectData: Notification | Notification[]) =>
                apply((objectData as Notification).id).then(alert),
            tooltip: 'Принять',
        },
        {
            icon: () => <Clear/>,
            onClick: (event: React.EventHandler<any>, objectData: Notification | Notification[]) =>
                deny((objectData as Notification).id).then(alert),
            tooltip: 'Отклонить',
        },
    ];
    const data = (query: Query<Notification>) => getAllNotifications(new Pageable(query.page, query.pageSize));

    return (<Table title='Уведомления' filtering={false} data={data} tableColumns={tableColumns}
                   tableActions={tableActions} tableRef={tableRef}/>);
}
