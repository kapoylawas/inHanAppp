import Pagination from "react-js-pagination";

function PaginationUlpimComponent(props) {
    return (
        props.total > 0 && (
            <Pagination
                innerClass={`pagination ${props.position} mb-0`}
                activePage={props.currentPage}
                activeClass="page-item active"
                itemsCountPerPage={10}
                totalItemsCount={500}
                onChange={props.onChange}
                itemClasss="page-item"
                linkClass="page-link"
            />
        )
    )
}

export default PaginationUlpimComponent;