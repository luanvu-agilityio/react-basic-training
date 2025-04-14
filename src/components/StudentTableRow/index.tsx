import styled from 'styled-components';
import { IStudent } from 'types/student';
import Button from '@components/common/Button';
import Avatar from '@components/common/Avatar';
import { DEFAULT_AVATAR } from '@constants/avatar';
import ImageIcon from '@components/common/ImageIcon';

/**
 * Styled components for StudentTableRow
 */
const TableRow = styled.tr`
  background-color: var(--white-color);

  &:hover {
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
    position: relative;
  }
`;

interface TableCellProps {
  isNameCell?: boolean;
  isEmailCell?: boolean;
  isFirstCell?: boolean;
  isLastCell?: boolean;
  dataLabel?: string;
}

const TableCell = styled.td<TableCellProps>`
  padding: 15px 10px;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-regular);
  border: none;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* Apply styles for specific cells */
  ${(props) =>
    props.isNameCell || props.isEmailCell
      ? `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
      : ''}

  /* First cell styling */
  ${(props) =>
    props.isFirstCell
      ? `
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
    overflow: hidden;
  `
      : ''}

  /* Last cell styling */
  ${(props) =>
    props.isLastCell
      ? `
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
    padding-right: 2rem;
  `
      : ''}

  /* Column width definitions */
  &:nth-child(1) {
    width: 85px; /* Avatar column */

    img {
      width: 6.5rem;
      height: 5.5rem;
      object-fit: cover;
      border-radius: 1rem;
    }
  }

  &:nth-child(2) {
    width: 17%; /* Name column */

    @media screen and (max-width: 1200px) {
      width: 18%;
    }

    @media screen and (max-width: 992px) {
      width: 16%;
    }
  }

  &:nth-child(3) {
    width: 20%; /* Email column */

    @media screen and (max-width: 1200px) {
      width: 18%;
    }

    @media screen and (max-width: 992px) {
      width: 16%;
    }
  }

  &:nth-child(4) {
    width: 13%; /* Phone Number column */
  }

  &:nth-child(5) {
    width: 20%; /* Enrollment Number column */
  }

  &:nth-child(6) {
    width: 15%; /* Date of Admission column */
  }

  &:nth-child(7) {
    width: 14%; /* Actions column */
  }

  @media screen and (max-width: 768px) {
    position: relative;
    padding-left: 50%;
    min-height: 3.5rem;
    display: flex;
    align-items: center;

    &:before {
      content: ${(props) => (props.dataLabel ? `"${props.dataLabel}"` : 'none')};
      position: absolute;
      top: 50%;
      left: 1rem;
      transform: translateY(-50%);
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      font-weight: var(--font-weight-semibold);
      color: var(--gray-color);
      font-size: var(--font-size-12);
    }

    /* First cell in mobile view */
    &:nth-child(1) {
      padding-left: 0;
      justify-content: center;
      padding-top: 1.5rem;

      img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        margin: 0 auto;
      }

      @media screen and (max-width: 576px) {
        img {
          width: 7rem;
          height: 7rem;
        }
      }
    }

    /* Last cell in mobile view */
    &:last-child {
      padding-left: 0;
      padding-bottom: 1.5rem;
    }

    /* Name cell in mobile view */
    &:nth-child(2) {
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-14);
    }

    @media screen and (max-width: 380px) {
      &:before {
        width: 40%;
      }
      padding-left: 45%;
    }
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-48);

  @media screen and (max-width: 768px) {
    justify-content: center;
    padding: 1rem 0;
    gap: var(--space-24);
  }

  @media screen and (max-width: 380px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const AvatarContainer = styled.div`
  /* Any specific avatar container styling */
`;

/**
 * Table column configuration
 * Defines the structure and rendering logic for each column
 */
const TABLE_COLUMNS = [
  {
    key: 'avatar',
    render: (student: IStudent) => (
      <AvatarContainer>
        <Avatar
          size="medium"
          variant="rectangle"
          src={student.avatar ?? DEFAULT_AVATAR}
          alt={`Student ${student.name}`}
        />
      </AvatarContainer>
    ),
  },
  {
    key: 'Name',
    render: (student: IStudent) => student.name,
  },
  {
    key: 'Email',
    render: (student: IStudent) => student.email,
  },
  {
    key: 'Phone Number',
    render: (student: IStudent) => student.phoneNum,
  },
  {
    key: 'Enrollment Number',
    render: (student: IStudent) => student.enrollNum,
  },
  {
    key: 'Date of Admission',
    render: (student: IStudent) => student.dateAdmission,
  },
  {
    key: 'actions',
    render: (
      student: IStudent,
      onEdit: (student: IStudent) => void,
      onDelete: (student: IStudent) => void,
    ) => (
      <ActionContainer>
        <Button variant="edit" onClick={() => student.id && onEdit(student)}>
          <ImageIcon
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868082/edit_gxvseg.svg"
            alt="Edit student"
            loading="eager"
            size={18}
          />
        </Button>
        <Button variant="delete" onClick={() => student.id && onDelete(student)}>
          <ImageIcon
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868081/delete_oynjal.svg"
            alt="Delete student"
            loading="eager"
            size={18}
          />
        </Button>
      </ActionContainer>
    ),
  },
];

/**
 * Props interface for StudentTableRowStyled
 */
interface StudentTableRowProps {
  /** Student data to display in the row */
  student: IStudent;
  /** Callback function when edit button is clicked */
  onEdit: (student: IStudent) => void;
  /** Callback function when delete button is clicked */
  onDelete: (student: IStudent) => void;
}

/**
 * StudentTableRowStyled Component
 *
 * Renders a table row with student information and action buttons using styled-components
 * Maps through configured columns to render cells consistently
 *
 * @param props StudentTableRowProps
 * @returns Table row element with student data
 */
const StudentTableRowStyled = ({ student, onEdit, onDelete }: StudentTableRowProps) => {
  return (
    <TableRow key={student.id} data-id={student.id}>
      {TABLE_COLUMNS.map((column, index) => (
        <TableCell
          key={column.key}
          isNameCell={column.key === 'Name'}
          isEmailCell={column.key === 'Email'}
          isFirstCell={index === 0}
          isLastCell={index === TABLE_COLUMNS.length - 1}
          dataLabel={column.key !== 'avatar' && column.key !== 'actions' ? column.key : undefined}
        >
          {column.key === 'actions'
            ? column.render(student, onEdit, onDelete)
            : column.render(
                student,
                () => {},
                () => {},
              )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default StudentTableRowStyled;
