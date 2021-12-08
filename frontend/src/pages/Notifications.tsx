import React from 'react';
import MaterialTable, {Action, Query} from 'material-table';

import Table from "../components/util/Table";
import {Check, Clear} from "@material-ui/icons";
import Dot from "../components/util/Dot";
import Checkbox from '@mui/material/Checkbox';
import {notificationsColors, showActions} from "../model/Notification";
import {apply, deny, getAllNotifications, markRead} from "../api/notifications";
import Notification from "../model/Notification";
import Pageable from "../model/Pageable";
import {useError, useSuccess} from "../hooks/logging";


export default function Notifications() {
    const tableRef = React.createRef<MaterialTable<Notification>>();

    const tableColumns = [
        {
            title: 'Новые',
            field: "new",
            sorting: false,
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
            sorting: false,
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

    const error = useError();
    const success = useSuccess();

    const onAnswerNotification = () => {
        success("Ваше решение успешно отправлено");
        // (tableRef.current as any).onQueryChange();
        //TODO: fix onQueryChange
        window.location.reload();
    };

    const tableActions: ((n: Notification) => Action<Notification>)[] = [
        (rowData: Notification) => ({
            icon: () => <Check/>,
            onClick: (event: React.EventHandler<any>, objectData: Notification | Notification[]) =>
                apply((objectData as Notification).id).then(onAnswerNotification).catch(error),
            tooltip: 'Принять',
            hidden: !showActions(rowData)
        }),
        (rowData: Notification) => ({
            icon: () => <Clear/>,
            onClick: (event: React.EventHandler<any>, objectData: Notification | Notification[]) =>
                deny((objectData as Notification).id).then(onAnswerNotification).catch(error),
            tooltip: 'Отклонить',
            hidden: !showActions(rowData)
        })
    ];
    const data = (query: Query<Notification>) => getAllNotifications(new Pageable(query.page, query.pageSize));

    return (<Table title='Уведомления' subHeader='Прочитанные и отвеченные уведомления автоматически удаляются по истечении месяца'
                   filtering={false} data={data} tableColumns={tableColumns} tableActions={tableActions} tableRef={tableRef}/>);
}
