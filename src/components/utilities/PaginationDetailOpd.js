import Pagination from "react-js-pagination";

function PaginationDetailOpd(props) {
    return (
        props.total > 0 && (
            <Pagination
                innerClass={`pagination ${props.position} mb-0`}
                activePage={props.currentPage}
                activeClass="page-item active"
                itemsCountPerPage={10}
                totalItemsCount={35}
                onChange={props.onChange}
                itemClasss="page-item"
                linkClass="page-link"
            />
        )
    )
}

export default PaginationDetailOpd;