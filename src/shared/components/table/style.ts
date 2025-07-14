import styled from "styled-components";

export const ExpandIcon = styled.img<{ isExpanded: boolean }>`
    transition: transform 0.3s ease;
    transform: ${({isExpanded}) => (isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const TableContainer = styled.div`
    width: 100%;
    box-shadow: ${props => props.theme.shadows.secondary};

    
`;

export const THead = styled.div`
    display: grid;
    grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1.5fr;
    padding: 0 16px;
    background-color: ${props => props.theme.colors.blue.primary};
    border-radius: 8px 8px 0 0;

    @media (max-width: 768px) {
        display: flex;
    }
`;

export const Th = styled.div`
    padding: 16px;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.theme.colors.white};
`;

export const TBody = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div<{ isExpanded: boolean }>`
    &:last-child {
        border-bottom: none;
    }

    background-color: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors.gray[10]};

    @media (min-width: 769px) {
        display: grid;
        grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 1.5fr;
        border-bottom: 1px solid ${props => props.theme.colors.gray[10]};
        border-radius: 0;
        box-shadow: none;


    }
`;

export const RowHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: pointer;
`;

export const RowDetails = styled.div<{ isExpanded: boolean }>`
    max-height: ${({isExpanded}) => (isExpanded ? '500px' : '0')};
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
    padding: ${({isExpanded}) => (isExpanded ? '0 16px 16px' : '0 16px')};
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Cell = styled.div`
    padding: 12px 16px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #344054;

    @media (max-width: 768px) {
        justify-content: space-between;
        padding: 8px 0;

        &::before {
            content: attr(data-label);
            font-weight: 600;
            color: #344054;
        }
    }
`;

export const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
`;