import {useMediaQuery} from "@material-ui/core";

export default function () {
    return useMediaQuery('(max-width: 800px)', {noSsr: true});
}